#!/usr/bin/env python3
"""Weekly AI-channel report: AI-referred sessions and downloads, plus Google guard rails.

  python3 scripts/with-environment.py \
    --env-file .env.1password.posthog --env-file .env.1password.gsc -- \
    python3 scripts/ai-channel-report.py [--weeks 6] [--out reports/ai-channel/DATE.md]

Weeks are Monday-Sunday in Asia/Bangkok, the timezone of the install digest.
Sections:
  1. Sessions and download sessions per AI engine (ChatGPT, Gemini, ...). ChatGPT is
     matched by referrer or utm_source=chatgpt.com.
  2. AI sessions per watched landing page, plus entries to /ai-file-sorter
     with neither a referrer nor a UTM tag.
  3. Guard rails: weekly Google clicks for protected pages and brand queries, and
     positions for protected queries. A page is flagged when its clicks fall below
     75% of the previous four-week average.
  4. Optional: new devices per week when SUPABASE_URL and SUPABASE_SECRET_KEY are set
     (run through zush-app's scripts/with-1password.sh --env-file .env.1password).
"""

from __future__ import annotations

import argparse
import json
import os
import ssl
import sys
import urllib.request
from collections import defaultdict
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import gsc_client  # noqa: E402

POSTHOG_QUERY_URL = "https://us.posthog.com/api/projects/455666/query/"
SITE = "https://zushapp.com"
TZ_OFFSET = timedelta(hours=7)  # Asia/Bangkok, no DST
SSL_CONTEXT = ssl.create_default_context(cafile="/etc/ssl/cert.pem")

AI_ENGINES = {
    "chatgpt": ("chatgpt", "openai"),
    "gemini": ("gemini",),
    "perplexity": ("perplexity",),
    "copilot": ("copilot",),
    "claude": ("claude",),
}
WATCHED_PAGES = [
    "/",
    "/ai-file-sorter",
    "/windows",
    "/mac",
    "/blog/best-ai-file-organizers-windows",
    "/blog/best-photo-organizer-windows-11",
    "/blog/best-ai-file-sorters",
    "/blog/hazel-for-windows-alternatives",
]
PROTECTED_PAGES = [
    "/",
    "/ai-file-sorter",
    "/mac",
    "/windows",
    "/blog/best-photo-organizer-windows-11",
    "/blog/best-ai-file-organizers-mac",
    "/blog/best-ai-file-sorters",
    "/blog/best-ai-file-organizers-windows",
]
PROTECTED_QUERIES = {
    "ai file sorter mac": "/ai-file-sorter",
    "ai file sorter": "/ai-file-sorter",
    "ai file renamer mac": "/mac",
    "zush": "/",
}
BRAND_TOKEN = "zush"


def week_starts(weeks: int) -> list[date]:
    today = (datetime.now(timezone.utc) + TZ_OFFSET).date()
    current_monday = today - timedelta(days=today.weekday())
    return [current_monday - timedelta(weeks=n) for n in range(weeks, 0, -1)]


def week_of(day: date) -> date:
    return day - timedelta(days=day.weekday())


def posthog_query(sql: str) -> list[list]:
    key = os.environ["POSTHOG_PERSONAL_API_KEY"]
    body = json.dumps({"query": {"kind": "HogQLQuery", "query": sql}}).encode()
    request = urllib.request.Request(
        POSTHOG_QUERY_URL,
        data=body,
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(request, context=SSL_CONTEXT, timeout=180) as response:
        return json.load(response)["results"]


def engine_for(referrer: str, utm_source: str) -> str | None:
    haystack = f"{utm_source} {referrer}".lower()
    for engine, needles in AI_ENGINES.items():
        if any(needle in haystack for needle in needles):
            return engine
    return None


def utc_bound(day: date) -> str:
    return (datetime.combine(day, datetime.min.time()) - TZ_OFFSET).strftime("%Y-%m-%d %H:%M:%S")


def load_sessions(start: date, end: date) -> list[tuple]:
    sql = f"""
      select toDate(min(toTimeZone(timestamp, 'Asia/Bangkok'))) as day,
        argMin(coalesce(properties.$referring_domain, ''), timestamp) as referrer,
        argMin(coalesce(properties.$pathname, ''), timestamp) as entry,
        argMin(coalesce(properties.utm_source, ''), timestamp) as utm_source,
        max(event in ('download_click', 'store_protocol_attempt')) as downloaded
      from events
      where properties.$host = 'zushapp.com'
        and timestamp >= '{utc_bound(start)}' and timestamp < '{utc_bound(end)}'
        and $session_id != ''
      group by $session_id
      limit 500000
    """
    return [
        (date.fromisoformat(str(day)), referrer, entry.rstrip("/") or "/", utm, bool(dl))
        for day, referrer, entry, utm, dl in posthog_query(sql)
    ]


def page_path(url: str) -> str:
    path = url.split("#")[0].removeprefix(SITE)
    return path.rstrip("/") or "/"


def load_gsc(start: date, end: date):
    client = gsc_client.GSCClient()
    page_clicks: dict[str, dict[date, float]] = defaultdict(lambda: defaultdict(float))
    brand_clicks: dict[date, float] = defaultdict(float)
    query_pos: dict[str, dict[date, list[float]]] = defaultdict(lambda: defaultdict(lambda: [0.0, 0.0]))
    last_day = start
    # Page totals come from a query-less request: rows with a query dimension omit
    # anonymized queries and undercount clicks.
    for row in client.query(["date", "page"], 25000, start.isoformat(), end.isoformat()):
        day_text, url = row["keys"]
        day = date.fromisoformat(day_text)
        last_day = max(last_day, day)
        if "#" not in url:
            page_clicks[page_path(url)][week_of(day)] += row["clicks"]
    for row in client.query(["date", "page", "query"], 25000, start.isoformat(), end.isoformat()):
        day_text, url, query = row["keys"]
        week = week_of(date.fromisoformat(day_text))
        path = page_path(url)
        if "#" not in url and BRAND_TOKEN in query.lower():
            brand_clicks[week] += row["clicks"]
        expected = PROTECTED_QUERIES.get(query.lower())
        if expected and path == expected:
            acc = query_pos[query.lower()][week]
            acc[0] += row["position"] * row["impressions"]
            acc[1] += row["impressions"]
    return page_clicks, brand_clicks, query_pos, last_day


def load_devices(start: date, end: date) -> dict[date, int] | None:
    url, key = os.environ.get("SUPABASE_URL"), os.environ.get("SUPABASE_SECRET_KEY")
    if not url or not key:
        return None
    since = (datetime.combine(start, datetime.min.time()) - TZ_OFFSET).strftime("%Y-%m-%dT%H:%M:%SZ")
    counts: dict[date, int] = defaultdict(int)
    offset = 0
    while True:
        request = urllib.request.Request(
            f"{url}/rest/v1/devices?select=created_at,app_version,is_suspected_automation,distribution_channel"
            f"&created_at=gte.{since}&order=created_at&limit=1000&offset={offset}",
            headers={"apikey": key, "Authorization": f"Bearer {key}"},
        )
        with urllib.request.urlopen(request, context=SSL_CONTEXT, timeout=60) as response:
            batch = json.load(response)
        for device in batch:
            if not device["app_version"] or device["is_suspected_automation"] or device["distribution_channel"] == "debug":
                continue
            created = datetime.fromisoformat(device["created_at"].replace("Z", "+00:00")) + TZ_OFFSET
            if created.date() < end:
                counts[week_of(created.date())] += 1
        if len(batch) < 1000:
            return counts
        offset += 1000


def table(header: list[str], rows: list[list]) -> str:
    lines = ["| " + " | ".join(header) + " |", "|" + "---|" * len(header)]
    lines += ["| " + " | ".join(str(cell) for cell in row) + " |" for row in rows]
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument("--weeks", type=int, default=6)
    parser.add_argument("--out", help="Write markdown here instead of stdout")
    args = parser.parse_args()

    weeks = week_starts(args.weeks)
    start, end = weeks[0], weeks[-1] + timedelta(days=7)
    # Guard rails compare against the four weeks before the first reported week.
    guard_start = start - timedelta(weeks=4)
    labels = [w.strftime("%m-%d") for w in weeks]

    sessions = load_sessions(start, end)
    engine_sessions = defaultdict(lambda: defaultdict(lambda: [0, 0]))
    page_ai = defaultdict(lambda: defaultdict(lambda: [0, 0]))
    sorter_no_referrer = defaultdict(lambda: [0, 0])
    for day, referrer, entry, utm, downloaded in sessions:
        week = week_of(day)
        engine = engine_for(referrer, utm)
        if engine:
            for bucket in (engine_sessions[engine][week], engine_sessions["all AI"][week], page_ai[entry][week]):
                bucket[0] += 1
                bucket[1] += downloaded
        elif referrer in ("", "$direct") and entry == "/ai-file-sorter":
            sorter_no_referrer[week][0] += 1
            sorter_no_referrer[week][1] += downloaded

    def cell(pair: list[int]) -> str:
        return f"{pair[0]} / {pair[1]}" if pair[0] else "–"

    out = [f"# AI channel report — {date.today().isoformat()}", ""]
    out += [f"Weeks Monday–Sunday (Asia/Bangkok), {labels[0]} … {labels[-1]}. Cells: sessions / download sessions.", ""]
    out += ["## AI engines", ""]
    engines = ["all AI", *AI_ENGINES]
    out.append(table(["engine", *labels], [[e, *(cell(engine_sessions[e][w]) for w in weeks)] for e in engines]))
    out += ["", "## AI sessions by landing page", ""]
    page_rows = [[p, *(cell(page_ai[p][w]) for w in weeks)] for p in WATCHED_PAGES]
    page_rows.append(["/ai-file-sorter, no referrer or UTM", *(cell(sorter_no_referrer[w]) for w in weeks)])
    out.append(table(["page", *labels], page_rows))

    page_clicks, brand_clicks, query_pos, last_day = load_gsc(guard_start, end - timedelta(days=1))
    complete_until = week_of(last_day + timedelta(days=1))
    out += ["", "## Google guard rails", ""]
    out.append(f"GSC data through {last_day.isoformat()}; weeks from {complete_until.strftime('%m-%d')} on are partial (*).")
    out.append("")

    def week_label(w: date) -> str:
        return w.strftime("%m-%d") + ("*" if w >= complete_until else "")

    flagged: list[str] = []
    guard_rows = []
    for path in PROTECTED_PAGES:
        series = page_clicks[path]
        row = [path]
        for w in weeks:
            prior = [series[w - timedelta(weeks=n)] for n in range(1, 5)]
            baseline = sum(prior) / 4
            value = series[w]
            mark = ""
            if w < complete_until and baseline >= 4 and value < 0.75 * baseline:
                mark = " ⚠"
                flagged.append(f"{path} week {w.strftime('%m-%d')}: {value:.0f} vs avg {baseline:.1f}")
            row.append(f"{value:.0f}{mark}")
        guard_rows.append(row)
    guard_rows.append([f"brand ({BRAND_TOKEN}*)", *(f"{brand_clicks[w]:.0f}" for w in weeks)])
    out.append(table(["Google clicks", *(week_label(w) for w in weeks)], guard_rows))
    out.append("")
    pos_rows = []
    for query, path in PROTECTED_QUERIES.items():
        cells = []
        for w in weeks:
            weighted, impressions = query_pos[query][w]
            cells.append(f"{weighted / impressions:.1f}" if impressions else "–")
        pos_rows.append([f"{query} → {path}", *cells])
    out.append(table(["position", *(week_label(w) for w in weeks)], pos_rows))
    out += ["", "Flags (clicks < 75% of previous 4-week average, complete weeks only):", ""]
    out += [f"- {line}" for line in flagged] or ["- none"]

    devices = load_devices(start, end)
    out += ["", "## New devices", ""]
    if devices is None:
        out.append("Skipped: SUPABASE_URL / SUPABASE_SECRET_KEY not set.")
    else:
        out.append(table(["devices", *labels], [["clean new devices", *(devices[w] for w in weeks)]]))

    report = "\n".join(out) + "\n"
    if args.out:
        Path(args.out).parent.mkdir(parents=True, exist_ok=True)
        Path(args.out).write_text(report)
        print(f"Wrote {args.out}")
    else:
        print(report)


if __name__ == "__main__":
    main()

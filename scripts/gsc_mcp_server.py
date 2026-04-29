#!/usr/bin/env python3
"""Minimal MCP server for Google Search Console using the local OAuth setup."""

from __future__ import annotations

import json
import os
import sys
from datetime import datetime, timedelta
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_GSC_CLIENT_DIR = Path("/Users/lirik/Projects/ai-marketing-skills/seo-ops")


def load_env_file(path: Path) -> None:
    if not path.exists():
        return

    for line in path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


def load_gsc_client():
    load_env_file(Path(os.environ.get("GSC_ENV_FILE", ROOT / ".env")))
    client_dir = Path(os.environ.get("GSC_CLIENT_DIR", DEFAULT_GSC_CLIENT_DIR))
    if str(client_dir) not in sys.path:
        sys.path.insert(0, str(client_dir))

    from gsc_client import GSCClient  # type: ignore

    return GSCClient


def json_text(data: Any) -> dict[str, Any]:
    return {
        "content": [
            {
                "type": "text",
                "text": json.dumps(data, ensure_ascii=False, indent=2),
            }
        ]
    }


TOOLS = [
    {
        "name": "list_sites",
        "description": "List verified Google Search Console properties available to the configured account.",
        "inputSchema": {
            "type": "object",
            "properties": {},
            "additionalProperties": False,
        },
    },
    {
        "name": "search_analytics",
        "description": "Query Google Search Console search analytics for a property.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "siteUrl": {
                    "type": "string",
                    "description": "GSC property, for example sc-domain:zushapp.com.",
                },
                "startDate": {"type": "string", "description": "YYYY-MM-DD."},
                "endDate": {"type": "string", "description": "YYYY-MM-DD."},
                "dimensions": {
                    "type": "array",
                    "items": {
                        "type": "string",
                        "enum": ["query", "page", "country", "device", "date", "searchAppearance"],
                    },
                    "default": ["query"],
                },
                "rowLimit": {"type": "integer", "minimum": 1, "maximum": 25000, "default": 100},
                "searchType": {
                    "type": "string",
                    "enum": ["web", "image", "video", "news", "discover", "googleNews"],
                    "default": "web",
                },
                "dataState": {"type": "string", "enum": ["final", "all"], "default": "final"},
            },
            "additionalProperties": False,
        },
    },
    {
        "name": "top_queries",
        "description": "Get top Google Search Console queries for the configured zushapp.com property.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "days": {"type": "integer", "minimum": 1, "maximum": 180, "default": 28},
                "limit": {"type": "integer", "minimum": 1, "maximum": 25000, "default": 25},
            },
            "additionalProperties": False,
        },
    },
]


class Transport:
    def __init__(self) -> None:
        self.mode: str | None = None

    def read_message(self) -> dict[str, Any] | None:
        first = sys.stdin.buffer.readline()
        if not first:
            return None

        if first.lower().startswith(b"content-length:"):
            self.mode = self.mode or "headers"
            length = int(first.split(b":", 1)[1].strip())
            while True:
                header = sys.stdin.buffer.readline()
                if header in (b"\r\n", b"\n", b""):
                    break
                if header.lower().startswith(b"content-length:"):
                    length = int(header.split(b":", 1)[1].strip())
            return json.loads(sys.stdin.buffer.read(length).decode("utf-8"))

        self.mode = self.mode or "lines"
        return json.loads(first.decode("utf-8"))

    def write_message(self, message: dict[str, Any]) -> None:
        payload = json.dumps(message, separators=(",", ":"), ensure_ascii=False).encode("utf-8")
        if self.mode == "headers":
            sys.stdout.buffer.write(f"Content-Length: {len(payload)}\r\n\r\n".encode("ascii"))
            sys.stdout.buffer.write(payload)
        else:
            sys.stdout.buffer.write(payload + b"\n")
        sys.stdout.buffer.flush()


def call_tool(name: str, args: dict[str, Any]) -> dict[str, Any]:
    GSCClient = load_gsc_client()

    if name == "list_sites":
        return json_text(GSCClient().list_sites())

    if name == "search_analytics":
        site_url = args.get("siteUrl") or os.environ.get("GSC_SITE_URL")
        if not site_url:
            raise ValueError("siteUrl is required or GSC_SITE_URL must be set.")
        rows = GSCClient(site_url=site_url).query(
            dimensions=args.get("dimensions") or ["query"],
            row_limit=args.get("rowLimit", 100),
            start_date=args.get("startDate"),
            end_date=args.get("endDate"),
            search_type=args.get("searchType", "web"),
            data_state=args.get("dataState", "final"),
        )
        return json_text(rows)

    if name == "top_queries":
        days = int(args.get("days", 28))
        limit = int(args.get("limit", 25))
        end_date = (datetime.now() - timedelta(days=3)).strftime("%Y-%m-%d")
        start_date = (datetime.now() - timedelta(days=days + 2)).strftime("%Y-%m-%d")
        rows = GSCClient().query(
            dimensions=["query"],
            row_limit=limit,
            start_date=start_date,
            end_date=end_date,
        )
        return json_text(rows)

    raise ValueError(f"Unknown tool: {name}")


def handle(request: dict[str, Any]) -> dict[str, Any] | None:
    method = request.get("method")
    request_id = request.get("id")

    if request_id is None:
        return None

    try:
        if method == "initialize":
            result = {
                "protocolVersion": request.get("params", {}).get("protocolVersion", "2024-11-05"),
                "capabilities": {"tools": {}},
                "serverInfo": {"name": "zush-gsc", "version": "0.1.0"},
            }
        elif method == "tools/list":
            result = {"tools": TOOLS}
        elif method == "tools/call":
            params = request.get("params", {})
            result = call_tool(params["name"], params.get("arguments") or {})
        else:
            return {
                "jsonrpc": "2.0",
                "id": request_id,
                "error": {"code": -32601, "message": f"Method not found: {method}"},
            }
        return {"jsonrpc": "2.0", "id": request_id, "result": result}
    except Exception as exc:
        return {
            "jsonrpc": "2.0",
            "id": request_id,
            "error": {"code": -32000, "message": str(exc)},
        }


def main() -> None:
    transport = Transport()
    while True:
        request = transport.read_message()
        if request is None:
            return
        response = handle(request)
        if response is not None:
            transport.write_message(response)


if __name__ == "__main__":
    main()

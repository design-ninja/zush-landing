#!/usr/bin/env python3
"""Read-only Google Search Console client with no third-party dependencies."""

from __future__ import annotations

import json
import os
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any
from urllib.error import HTTPError
from urllib.parse import quote, urlencode
from urllib.request import Request, urlopen


DEFAULT_SITE_URL = "sc-domain:zushapp.com"
DEFAULT_TOKEN_FILE = Path.home() / ".config/google-search-console/zushapp-token.json"
SITES_ENDPOINT = "https://searchconsole.googleapis.com/webmasters/v3/sites"
SEARCH_ANALYTICS_ENDPOINT = (
    "https://searchconsole.googleapis.com/webmasters/v3/sites/{site_url}/searchAnalytics/query"
)


class GSCClient:
    """Query verified properties and Search Analytics using a read-only OAuth token."""

    def __init__(self, site_url: str | None = None, token_file: str | Path | None = None) -> None:
        self.site_url = site_url or os.environ.get("GSC_SITE_URL") or DEFAULT_SITE_URL
        configured_token = token_file or os.environ.get("GSC_TOKEN_FILE")
        self.token_file = Path(configured_token).expanduser() if configured_token else DEFAULT_TOKEN_FILE
        self.credentials = self._load_credentials()

    def _load_credentials(self) -> dict[str, Any]:
        if not self.token_file.is_file():
            raise FileNotFoundError(
                f"GSC OAuth token not found at {self.token_file}. Set GSC_TOKEN_FILE to a valid "
                "read-only token JSON path or restore the default file."
            )
        try:
            data = json.loads(self.token_file.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as exc:
            raise RuntimeError(f"Could not read GSC OAuth token at {self.token_file}: {exc}") from exc
        if not isinstance(data, dict):
            raise RuntimeError(f"GSC OAuth token at {self.token_file} must contain a JSON object.")
        return data

    def _access_token(self) -> str:
        token = self.credentials.get("token") or self.credentials.get("access_token")
        if token:
            return str(token)
        return self._refresh_access_token()

    def _refresh_access_token(self) -> str:
        refresh_token = self.credentials.get("refresh_token")
        client_id = os.environ.get("GOOGLE_CLIENT_ID") or self.credentials.get("client_id")
        client_secret = os.environ.get("GOOGLE_CLIENT_SECRET") or self.credentials.get("client_secret")
        token_uri = self.credentials.get("token_uri") or "https://oauth2.googleapis.com/token"
        if not refresh_token or not client_id or not client_secret:
            raise RuntimeError(
                "The GSC token is expired or incomplete. A refresh_token, client_id, and client_secret "
                "are required; client credentials may be supplied through the environment."
            )

        body = urlencode(
            {
                "client_id": client_id,
                "client_secret": client_secret,
                "refresh_token": refresh_token,
                "grant_type": "refresh_token",
            }
        ).encode("utf-8")
        request = Request(
            str(token_uri),
            data=body,
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            method="POST",
        )
        try:
            with urlopen(request, timeout=30) as response:
                payload = json.load(response)
        except HTTPError as exc:
            detail = exc.read().decode("utf-8", errors="replace")
            raise RuntimeError(f"Could not refresh the GSC OAuth token: HTTP {exc.code}: {detail}") from exc
        access_token = payload.get("access_token")
        if not access_token:
            raise RuntimeError("Google OAuth refresh response did not contain an access_token.")
        self.credentials["token"] = access_token
        return str(access_token)

    def _request(self, url: str, payload: dict[str, Any] | None = None, retry: bool = True) -> Any:
        body = json.dumps(payload).encode("utf-8") if payload is not None else None
        headers = {"Authorization": f"Bearer {self._access_token()}"}
        if body is not None:
            headers["Content-Type"] = "application/json"
        request = Request(url, data=body, headers=headers, method="POST" if body is not None else "GET")
        try:
            with urlopen(request, timeout=30) as response:
                return json.load(response)
        except HTTPError as exc:
            if exc.code == 401 and retry:
                self.credentials.pop("token", None)
                self.credentials.pop("access_token", None)
                self._refresh_access_token()
                return self._request(url, payload, retry=False)
            detail = exc.read().decode("utf-8", errors="replace")
            raise RuntimeError(f"GSC API request failed: HTTP {exc.code}: {detail}") from exc

    def list_sites(self) -> list[dict[str, Any]]:
        response = self._request(SITES_ENDPOINT)
        return response.get("siteEntry", [])

    def query(
        self,
        dimensions: list[str] | None = None,
        row_limit: int = 100,
        start_date: str | None = None,
        end_date: str | None = None,
        search_type: str = "web",
        data_state: str = "final",
    ) -> list[dict[str, Any]]:
        today = datetime.now(timezone.utc).date()
        resolved_end = end_date or (today - timedelta(days=3)).isoformat()
        resolved_start = start_date or (today - timedelta(days=30)).isoformat()
        payload = {
            "startDate": resolved_start,
            "endDate": resolved_end,
            "dimensions": dimensions or ["query"],
            "rowLimit": row_limit,
            "type": search_type,
            "dataState": data_state,
        }
        endpoint = SEARCH_ANALYTICS_ENDPOINT.format(site_url=quote(self.site_url, safe=""))
        response = self._request(endpoint, payload)
        return response.get("rows", [])

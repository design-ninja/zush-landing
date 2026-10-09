#!/usr/bin/env python3
"""Prepare the Zush Mac Google Search campaign for launch.

This script is intentionally idempotent for campaign structure:
- it pauses the old mixed ad group/ad,
- creates named intent-based ad groups when missing,
- adds the desired keywords when missing,
- replaces campaign-level asset associations,
- adds campaign-level negative keywords when missing.

Secrets are read from the process environment and Google ADC file; nothing
sensitive is printed. Use scripts/with-1password.sh for local operations.
"""

from __future__ import annotations

import csv
import json
import os
from dataclasses import dataclass
from pathlib import Path

from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException
from google.protobuf.field_mask_pb2 import FieldMask


ROOT = Path(__file__).resolve().parents[3]
PLAN_DIR = ROOT / "marketing/ads"

CUSTOMER_ID = "4714692966"
CAMPAIGN_ID = "23816664121"
LEGACY_AD_GROUP_ID = "193915548417"

CAMPAIGN_RESOURCE = f"customers/{CUSTOMER_ID}/campaigns/{CAMPAIGN_ID}"
LEGACY_AD_GROUP_RESOURCE = f"customers/{CUSTOMER_ID}/adGroups/{LEGACY_AD_GROUP_ID}"
MAX_CPC_BID_MICROS = 50_000_000


@dataclass(frozen=True)
class KeywordSpec:
    text: str
    match_type: str
    final_url: str
    utm_content: str


@dataclass(frozen=True)
class NegativeKeywordSpec:
    text: str
    match_type: str


@dataclass(frozen=True)
class AdGroupSpec:
    name: str
    utm_content: str
    final_url: str
    path1: str
    keywords: tuple[KeywordSpec, ...]
    headlines: tuple[str, ...]
    descriptions: tuple[str, ...]


AD_GROUP_PATHS = {
    "Core AI File Renamer": "mac",
    "Screenshots Images Mac": "screenshots",
    "PDF Docs Downloads Mac": "pdf-renamer",
    "Alternatives Competitors": "compare",
}


def read_plan_csv(filename: str) -> list[dict[str, str]]:
    with (PLAN_DIR / filename).open(encoding="utf-8", newline="") as source:
        return list(csv.DictReader(source))


def single_value(rows: list[dict[str, str]], field: str, source: str) -> str:
    values = {row[field].strip() for row in rows if row.get(field, "").strip()}
    if len(values) != 1:
        raise ValueError(f"{source} must contain exactly one {field}: {sorted(values)}")
    return values.pop()


def primary_value(rows: list[dict[str, str]], field: str, source: str) -> str:
    values = [row[field].strip() for row in rows if row.get(field, "").strip()]
    if not values:
        raise ValueError(f"{source} must contain {field}")
    return max(dict.fromkeys(values), key=values.count)


def load_plan() -> tuple[
    str,
    str,
    tuple[AdGroupSpec, ...],
    tuple[NegativeKeywordSpec, ...],
    dict[str, tuple[NegativeKeywordSpec, ...]],
    tuple[tuple[str, str, str, str], ...],
    tuple[str, ...],
]:
    keyword_rows = read_plan_csv("google-search-keywords.csv")
    rsa_rows = read_plan_csv("google-search-rsa-assets.csv")
    negative_rows = read_plan_csv("google-search-negative-keywords.csv")
    ad_group_negative_rows = read_plan_csv("google-search-ad-group-negative-keywords.csv")
    extension_rows = read_plan_csv("google-search-extensions.csv")
    sources = {
        "google-search-keywords.csv": keyword_rows,
        "google-search-rsa-assets.csv": rsa_rows,
        "google-search-negative-keywords.csv": negative_rows,
        "google-search-ad-group-negative-keywords.csv": ad_group_negative_rows,
        "google-search-extensions.csv": extension_rows,
    }
    campaign_name = single_value(keyword_rows, "campaign", "google-search-keywords.csv")
    for source, rows in sources.items():
        if single_value(rows, "campaign", source) != campaign_name:
            raise ValueError(f"{source} campaign does not match {campaign_name}")

    utm_campaign = single_value(keyword_rows, "utm_campaign", "google-search-keywords.csv")
    group_names = list(dict.fromkeys(row["ad_group"].strip() for row in keyword_rows))
    if set(group_names) != set(AD_GROUP_PATHS):
        raise ValueError("keyword CSV ad groups must match AD_GROUP_PATHS")

    groups: list[AdGroupSpec] = []
    for name in group_names:
        group_keywords = [row for row in keyword_rows if row["ad_group"].strip() == name]
        final_url = primary_value(group_keywords, "final_url", name)
        utm_content = primary_value(group_keywords, "utm_content", name)
        assets = [row for row in rsa_rows if row["ad_group"].strip() == name]
        headlines = tuple(row["text"].strip() for row in assets if row["type"] == "Headline")
        descriptions = tuple(row["text"].strip() for row in assets if row["type"] == "Description")
        if not headlines or not descriptions:
            raise ValueError(f"{name} is missing RSA headlines or descriptions")
        groups.append(AdGroupSpec(
            name=name,
            utm_content=utm_content,
            final_url=final_url,
            path1=AD_GROUP_PATHS[name],
            keywords=tuple(
                KeywordSpec(
                    row["keyword"].strip(),
                    row["match_type"].strip().upper(),
                    row["final_url"].strip(),
                    row["utm_content"].strip(),
                )
                for row in group_keywords
            ),
            headlines=headlines,
            descriptions=descriptions,
        ))

    campaign_negatives = tuple(
        NegativeKeywordSpec(row["negative_keyword"].strip(), row["match_type"].strip().upper())
        for row in negative_rows
    )
    ad_group_negatives = {
        name: tuple(
            NegativeKeywordSpec(row["negative_keyword"].strip(), row["match_type"].strip().upper())
            for row in ad_group_negative_rows
            if row["ad_group"].strip() == name
        )
        for name in group_names
    }
    sitelinks = tuple(
        (row["text"].strip(), row["line_1"].strip(), row["line_2"].strip(), row["final_url"].strip())
        for row in extension_rows
        if row["extension_type"] == "Sitelink"
    )
    callouts = tuple(
        row["text"].strip()
        for row in extension_rows
        if row["extension_type"] == "Callout"
    )
    return (
        campaign_name,
        utm_campaign,
        tuple(groups),
        campaign_negatives,
        ad_group_negatives,
        sitelinks,
        callouts,
    )


(
    CAMPAIGN_NAME,
    UTM_CAMPAIGN,
    AD_GROUPS,
    NEGATIVE_KEYWORDS,
    AD_GROUP_NEGATIVE_KEYWORDS,
    SITELINKS,
    CALLOUTS,
) = load_plan()


def load_client() -> GoogleAdsClient:
    adc_path = Path(os.environ["GOOGLE_APPLICATION_CREDENTIALS"]).expanduser()
    adc = json.loads(adc_path.read_text())
    config = {
        "developer_token": os.environ["GOOGLE_ADS_DEVELOPER_TOKEN"],
        "client_id": adc["client_id"],
        "client_secret": adc["client_secret"],
        "refresh_token": adc["refresh_token"],
        "login_customer_id": os.environ.get("GOOGLE_ADS_LOGIN_CUSTOMER_ID", "2807588601"),
        "use_proto_plus": True,
    }
    return GoogleAdsClient.load_from_dict(config)


def search(client: GoogleAdsClient, query: str) -> list:
    service = client.get_service("GoogleAdsService")
    return list(service.search(customer_id=CUSTOMER_ID, query=query))


def enum_value(client: GoogleAdsClient, enum_name: str, value_name: str):
    return getattr(getattr(client.enums, enum_name), value_name)


def update_campaign(client: GoogleAdsClient) -> None:
    service = client.get_service("CampaignService")
    op = client.get_type("CampaignOperation")
    campaign = op.update
    campaign.resource_name = CAMPAIGN_RESOURCE
    campaign.name = CAMPAIGN_NAME
    campaign.final_url_suffix = (
        f"utm_source=google&utm_medium=cpc&utm_campaign={UTM_CAMPAIGN}"
        "&utm_term={keyword}&utm_device={device}"
        "&utm_matchtype={matchtype}"
    )
    op.update_mask.CopyFrom(FieldMask(paths=["name", "final_url_suffix"]))
    result = service.mutate_campaigns(customer_id=CUSTOMER_ID, operations=[op])
    print("updated campaign", result.results[0].resource_name)


def remove_legacy_ad_group(client: GoogleAdsClient) -> None:
    legacy_ads = search(
        client,
        f"""
        SELECT ad_group_ad.resource_name, ad_group_ad.status
        FROM ad_group_ad
        WHERE ad_group_ad.ad_group = '{LEGACY_AD_GROUP_RESOURCE}'
          AND ad_group_ad.status != REMOVED
        """,
    )
    if legacy_ads:
        ad_ops = []
        for row in legacy_ads:
            op = client.get_type("AdGroupAdOperation")
            op.remove = row.ad_group_ad.resource_name
            ad_ops.append(op)
        client.get_service("AdGroupAdService").mutate_ad_group_ads(
            customer_id=CUSTOMER_ID, operations=ad_ops
        )
        print("removed legacy ads", len(ad_ops))

    rows = search(
        client,
        f"""
        SELECT ad_group.resource_name, ad_group.status
        FROM ad_group
        WHERE ad_group.resource_name = '{LEGACY_AD_GROUP_RESOURCE}'
          AND ad_group.status != REMOVED
        """,
    )
    if not rows:
        print("legacy ad group already removed")
        return

    ad_group_service = client.get_service("AdGroupService")
    op = client.get_type("AdGroupOperation")
    op.remove = LEGACY_AD_GROUP_RESOURCE
    ad_group_service.mutate_ad_groups(customer_id=CUSTOMER_ID, operations=[op])
    print("removed legacy ad group", LEGACY_AD_GROUP_RESOURCE)


def ensure_ad_groups(client: GoogleAdsClient) -> dict[str, str]:
    rows = search(
        client,
        f"""
        SELECT ad_group.resource_name, ad_group.name, ad_group.status
        FROM ad_group
        WHERE ad_group.campaign = '{CAMPAIGN_RESOURCE}'
          AND ad_group.status != REMOVED
        """,
    )
    existing = {row.ad_group.name: row.ad_group.resource_name for row in rows}
    missing = [spec for spec in AD_GROUPS if spec.name not in existing]
    if missing:
        service = client.get_service("AdGroupService")
        operations = []
        for spec in missing:
            op = client.get_type("AdGroupOperation")
            ad_group = op.create
            ad_group.name = spec.name
            ad_group.campaign = CAMPAIGN_RESOURCE
            ad_group.status = enum_value(client, "AdGroupStatusEnum", "ENABLED")
            ad_group.type_ = enum_value(client, "AdGroupTypeEnum", "SEARCH_STANDARD")
            ad_group.cpc_bid_micros = MAX_CPC_BID_MICROS
            ad_group.final_url_suffix = ad_group_final_url_suffix(spec)
            operations.append(op)
        result = service.mutate_ad_groups(customer_id=CUSTOMER_ID, operations=operations)
        for spec, item in zip(missing, result.results):
            existing[spec.name] = item.resource_name
            print("created ad group", spec.name, item.resource_name)

    return {spec.name: existing[spec.name] for spec in AD_GROUPS}


def ad_group_final_url_suffix(spec: AdGroupSpec) -> str:
    return (
        f"utm_source=google&utm_medium=cpc&utm_campaign={UTM_CAMPAIGN}"
        f"&utm_content={spec.utm_content}&utm_term={{keyword}}"
        "&utm_device={device}&utm_matchtype={matchtype}"
    )


def keyword_final_url_suffix(keyword: KeywordSpec) -> str:
    return (
        f"utm_source=google&utm_medium=cpc&utm_campaign={UTM_CAMPAIGN}"
        f"&utm_content={keyword.utm_content}&utm_term={{keyword}}"
        "&utm_device={device}&utm_matchtype={matchtype}"
    )


def update_ad_group_suffixes(client: GoogleAdsClient, ad_groups: dict[str, str]) -> None:
    service = client.get_service("AdGroupService")
    operations = []
    for spec in AD_GROUPS:
        op = client.get_type("AdGroupOperation")
        ad_group = op.update
        ad_group.resource_name = ad_groups[spec.name]
        ad_group.final_url_suffix = ad_group_final_url_suffix(spec)
        op.update_mask.CopyFrom(FieldMask(paths=["final_url_suffix"]))
        operations.append(op)
    if operations:
        service.mutate_ad_groups(customer_id=CUSTOMER_ID, operations=operations)
    print("ad group final URL suffixes updated", len(operations))


def ensure_keywords(client: GoogleAdsClient, ad_groups: dict[str, str]) -> None:
    criterion_service = client.get_service("AdGroupCriterionService")
    for spec in AD_GROUPS:
        ad_group = ad_groups[spec.name]
        rows = search(
            client,
            f"""
            SELECT ad_group_criterion.resource_name,
                   ad_group_criterion.keyword.text,
                   ad_group_criterion.keyword.match_type,
                   ad_group_criterion.final_urls,
                   ad_group_criterion.final_url_suffix,
                   ad_group_criterion.negative,
                   ad_group_criterion.status
            FROM ad_group_criterion
            WHERE ad_group_criterion.ad_group = '{ad_group}'
              AND ad_group_criterion.type = KEYWORD
              AND ad_group_criterion.status != REMOVED
            """,
        )
        existing = {
            (row.ad_group_criterion.keyword.text.lower(), row.ad_group_criterion.keyword.match_type.name): row.ad_group_criterion
            for row in rows
            if not row.ad_group_criterion.negative
        }
        operations = []
        created = 0
        updated = 0
        for keyword in spec.keywords:
            key = (keyword.text.lower(), keyword.match_type)
            op = client.get_type("AdGroupCriterionOperation")
            final_url_suffix = keyword_final_url_suffix(keyword)
            if key in existing:
                current = existing[key]
                if list(current.final_urls) == [keyword.final_url] and current.final_url_suffix == final_url_suffix:
                    continue
                criterion = op.update
                criterion.resource_name = current.resource_name
                criterion.final_urls.append(keyword.final_url)
                criterion.final_url_suffix = final_url_suffix
                op.update_mask.CopyFrom(FieldMask(paths=["final_urls", "final_url_suffix"]))
                updated += 1
            else:
                criterion = op.create
                criterion.ad_group = ad_group
                criterion.status = enum_value(client, "AdGroupCriterionStatusEnum", "ENABLED")
                criterion.keyword.text = keyword.text
                criterion.keyword.match_type = enum_value(client, "KeywordMatchTypeEnum", keyword.match_type)
                criterion.cpc_bid_micros = MAX_CPC_BID_MICROS
                criterion.final_urls.append(keyword.final_url)
                criterion.final_url_suffix = final_url_suffix
                created += 1
            operations.append(op)
        if operations:
            criterion_service.mutate_ad_group_criteria(customer_id=CUSTOMER_ID, operations=operations)
        print("keywords ready", spec.name, created, "created", updated, "updated")


def ensure_cpc_caps(client: GoogleAdsClient) -> None:
    service = client.get_service("GoogleAdsService")

    ad_group_rows = list(
        service.search(
            customer_id=CUSTOMER_ID,
            query=f"""
            SELECT ad_group.resource_name,
                   ad_group.cpc_bid_micros
            FROM ad_group
            WHERE ad_group.campaign = '{CAMPAIGN_RESOURCE}'
              AND ad_group.status = ENABLED
            """,
        )
    )
    ad_group_service = client.get_service("AdGroupService")
    ad_group_operations = []
    for row in ad_group_rows:
        if row.ad_group.cpc_bid_micros == MAX_CPC_BID_MICROS:
            continue
        op = client.get_type("AdGroupOperation")
        ad_group = op.update
        ad_group.resource_name = row.ad_group.resource_name
        ad_group.cpc_bid_micros = MAX_CPC_BID_MICROS
        op.update_mask.CopyFrom(FieldMask(paths=["cpc_bid_micros"]))
        ad_group_operations.append(op)
    if ad_group_operations:
        ad_group_service.mutate_ad_groups(customer_id=CUSTOMER_ID, operations=ad_group_operations)
    print("ad group CPC caps updated", len(ad_group_operations))

    criterion_rows = list(
        service.search(
            customer_id=CUSTOMER_ID,
            query=f"""
            SELECT ad_group_criterion.resource_name,
                   ad_group_criterion.cpc_bid_micros,
                   ad_group_criterion.effective_cpc_bid_micros
            FROM ad_group_criterion
            WHERE ad_group.campaign = '{CAMPAIGN_RESOURCE}'
              AND ad_group.status = ENABLED
              AND ad_group_criterion.type = KEYWORD
              AND ad_group_criterion.negative = FALSE
              AND ad_group_criterion.status = ENABLED
            """,
        )
    )
    criterion_service = client.get_service("AdGroupCriterionService")
    criterion_operations = []
    for row in criterion_rows:
        if (
            row.ad_group_criterion.cpc_bid_micros == MAX_CPC_BID_MICROS
            and row.ad_group_criterion.effective_cpc_bid_micros <= MAX_CPC_BID_MICROS
        ):
            continue
        op = client.get_type("AdGroupCriterionOperation")
        criterion = op.update
        criterion.resource_name = row.ad_group_criterion.resource_name
        criterion.cpc_bid_micros = MAX_CPC_BID_MICROS
        op.update_mask.CopyFrom(FieldMask(paths=["cpc_bid_micros"]))
        criterion_operations.append(op)
    if criterion_operations:
        criterion_service.mutate_ad_group_criteria(customer_id=CUSTOMER_ID, operations=criterion_operations)
    print("keyword CPC caps updated", len(criterion_operations))


def ensure_negative_keywords(client: GoogleAdsClient) -> None:
    rows = search(
        client,
        f"""
        SELECT campaign_criterion.keyword.text,
               campaign_criterion.keyword.match_type,
               campaign_criterion.negative,
               campaign_criterion.status
        FROM campaign_criterion
        WHERE campaign_criterion.campaign = '{CAMPAIGN_RESOURCE}'
          AND campaign_criterion.type = KEYWORD
          AND campaign_criterion.status != REMOVED
        """,
    )
    existing = {
        (row.campaign_criterion.keyword.text.lower(), row.campaign_criterion.keyword.match_type.name)
        for row in rows
        if row.campaign_criterion.negative
    }
    operations = []
    for keyword in NEGATIVE_KEYWORDS:
        key = (keyword.text.lower(), keyword.match_type)
        if key in existing:
            continue
        op = client.get_type("CampaignCriterionOperation")
        criterion = op.create
        criterion.campaign = CAMPAIGN_RESOURCE
        criterion.negative = True
        criterion.keyword.text = keyword.text
        criterion.keyword.match_type = enum_value(client, "KeywordMatchTypeEnum", keyword.match_type)
        operations.append(op)
    if operations:
        client.get_service("CampaignCriterionService").mutate_campaign_criteria(
            customer_id=CUSTOMER_ID, operations=operations
        )
    print("campaign negatives ready", len(operations), "created")


def ensure_ad_group_negative_keywords(client: GoogleAdsClient, ad_groups: dict[str, str]) -> None:
    service = client.get_service("AdGroupCriterionService")
    for name, keywords in AD_GROUP_NEGATIVE_KEYWORDS.items():
        if not keywords:
            continue
        ad_group = ad_groups[name]
        rows = search(
            client,
            f"""
            SELECT ad_group_criterion.keyword.text,
                   ad_group_criterion.keyword.match_type,
                   ad_group_criterion.negative,
                   ad_group_criterion.status
            FROM ad_group_criterion
            WHERE ad_group_criterion.ad_group = '{ad_group}'
              AND ad_group_criterion.type = KEYWORD
              AND ad_group_criterion.status != REMOVED
            """,
        )
        existing = {
            (row.ad_group_criterion.keyword.text.lower(), row.ad_group_criterion.keyword.match_type.name)
            for row in rows
            if row.ad_group_criterion.negative
        }
        operations = []
        for keyword in keywords:
            key = (keyword.text.lower(), keyword.match_type)
            if key in existing:
                continue
            op = client.get_type("AdGroupCriterionOperation")
            criterion = op.create
            criterion.ad_group = ad_group
            criterion.negative = True
            criterion.keyword.text = keyword.text
            criterion.keyword.match_type = enum_value(
                client,
                "KeywordMatchTypeEnum",
                keyword.match_type,
            )
            operations.append(op)
        if operations:
            service.mutate_ad_group_criteria(customer_id=CUSTOMER_ID, operations=operations)
        print("ad group negatives ready", name, len(operations), "created")


def replace_campaign_assets(client: GoogleAdsClient) -> None:
    campaign_asset_service = client.get_service("CampaignAssetService")
    rows = search(
        client,
        f"""
        SELECT campaign_asset.resource_name, campaign_asset.field_type, campaign_asset.status
        FROM campaign_asset
        WHERE campaign_asset.campaign = '{CAMPAIGN_RESOURCE}'
          AND campaign_asset.status != REMOVED
          AND campaign_asset.field_type IN (SITELINK, CALLOUT)
        """,
    )
    remove_ops = []
    for row in rows:
        op = client.get_type("CampaignAssetOperation")
        op.remove = row.campaign_asset.resource_name
        remove_ops.append(op)
    if remove_ops:
        campaign_asset_service.mutate_campaign_assets(customer_id=CUSTOMER_ID, operations=remove_ops)
    print("removed old asset associations", len(remove_ops))

    asset_service = client.get_service("AssetService")
    asset_ops = []
    field_types = []
    for link_text, desc1, desc2, url in SITELINKS:
        op = client.get_type("AssetOperation")
        asset = op.create
        asset.type_ = enum_value(client, "AssetTypeEnum", "SITELINK")
        asset.final_urls.append(url)
        asset.sitelink_asset.link_text = link_text
        asset.sitelink_asset.description1 = desc1
        asset.sitelink_asset.description2 = desc2
        asset_ops.append(op)
        field_types.append(enum_value(client, "AssetFieldTypeEnum", "SITELINK"))
    for text in CALLOUTS:
        op = client.get_type("AssetOperation")
        asset = op.create
        asset.type_ = enum_value(client, "AssetTypeEnum", "CALLOUT")
        asset.callout_asset.callout_text = text
        asset_ops.append(op)
        field_types.append(enum_value(client, "AssetFieldTypeEnum", "CALLOUT"))

    asset_result = asset_service.mutate_assets(customer_id=CUSTOMER_ID, operations=asset_ops)
    attach_ops = []
    for item, field_type in zip(asset_result.results, field_types):
        op = client.get_type("CampaignAssetOperation")
        campaign_asset = op.create
        campaign_asset.campaign = CAMPAIGN_RESOURCE
        campaign_asset.asset = item.resource_name
        campaign_asset.field_type = field_type
        attach_ops.append(op)
    campaign_asset_service.mutate_campaign_assets(customer_id=CUSTOMER_ID, operations=attach_ops)
    print("created and attached assets", len(attach_ops))


def create_responsive_search_ads(client: GoogleAdsClient, ad_groups: dict[str, str]) -> None:
    service = client.get_service("AdGroupAdService")
    for spec in AD_GROUPS:
        ad_group = ad_groups[spec.name]
        rows = search(
            client,
            f"""
            SELECT ad_group_ad.resource_name, ad_group_ad.status, ad_group_ad.ad.final_urls
            FROM ad_group_ad
            WHERE ad_group_ad.ad_group = '{ad_group}'
              AND ad_group_ad.ad.type = RESPONSIVE_SEARCH_AD
              AND ad_group_ad.status != REMOVED
            """,
        )
        if rows:
            print("rsa exists", spec.name, len(rows))
            continue

        op = client.get_type("AdGroupAdOperation")
        ad_group_ad = op.create
        ad_group_ad.ad_group = ad_group
        ad_group_ad.status = enum_value(client, "AdGroupAdStatusEnum", "ENABLED")
        ad = ad_group_ad.ad
        ad.final_urls.append(spec.final_url)
        rsa = ad.responsive_search_ad
        rsa.path1 = spec.path1
        for index, headline in enumerate(spec.headlines):
            asset = client.get_type("AdTextAsset")
            asset.text = headline
            if index == 0:
                asset.pinned_field = enum_value(client, "ServedAssetFieldTypeEnum", "HEADLINE_1")
            rsa.headlines.append(asset)
        for description in spec.descriptions:
            asset = client.get_type("AdTextAsset")
            asset.text = description
            rsa.descriptions.append(asset)
        result = service.mutate_ad_group_ads(customer_id=CUSTOMER_ID, operations=[op])
        print("created rsa", spec.name, result.results[0].resource_name)


def reduce_mobile_tablet_bids(client: GoogleAdsClient) -> None:
    rows = search(
        client,
        f"""
        SELECT campaign_criterion.resource_name,
               campaign_criterion.device.type,
               campaign_criterion.status
        FROM campaign_criterion
        WHERE campaign_criterion.campaign = '{CAMPAIGN_RESOURCE}'
          AND campaign_criterion.type = DEVICE
          AND campaign_criterion.status != REMOVED
        """,
    )
    operations = []
    for row in rows:
        device = row.campaign_criterion.device.type.name
        op = client.get_type("CampaignCriterionOperation")
        criterion = op.update
        criterion.resource_name = row.campaign_criterion.resource_name
        if device == "DESKTOP":
            criterion.bid_modifier = 1.0
        elif device in {"MOBILE", "TABLET"}:
            criterion.bid_modifier = 0.1
        else:
            continue
        op.update_mask.CopyFrom(FieldMask(paths=["bid_modifier"]))
        operations.append(op)
    if operations:
        client.get_service("CampaignCriterionService").mutate_campaign_criteria(
            customer_id=CUSTOMER_ID, operations=operations
        )
    print("device bid modifiers updated", len(operations))


def main() -> None:
    if os.environ.get("ZUSH_GOOGLE_ADS_EXPLICITLY_ENABLED") != "1":
        raise SystemExit(
            "Google Ads operations are disabled. Set ZUSH_GOOGLE_ADS_EXPLICITLY_ENABLED=1 "
            "only after the user explicitly re-enables Ads work."
        )

    client = load_client()
    update_campaign(client)
    remove_legacy_ad_group(client)
    ad_groups = ensure_ad_groups(client)
    update_ad_group_suffixes(client, ad_groups)
    ensure_keywords(client, ad_groups)
    ensure_cpc_caps(client)
    ensure_negative_keywords(client)
    ensure_ad_group_negative_keywords(client, ad_groups)
    replace_campaign_assets(client)
    create_responsive_search_ads(client, ad_groups)
    reduce_mobile_tablet_bids(client)
    print("done")


if __name__ == "__main__":
    try:
        main()
    except GoogleAdsException as exc:
        print("Google Ads API request failed")
        print("request_id:", exc.request_id)
        for error in exc.failure.errors:
            location = ".".join(field.field_name for field in error.location.field_path_elements)
            print(f"- {error.error_code}: {error.message} ({location})")
        raise SystemExit(1) from exc

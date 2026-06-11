#!/usr/bin/env python3
"""Prepare the Zush Mac Google Search campaign for launch.

This script is intentionally idempotent for campaign structure:
- it pauses the old mixed ad group/ad,
- creates named intent-based ad groups when missing,
- adds the desired keywords when missing,
- replaces campaign-level asset associations,
- adds campaign-level negative keywords when missing.

Secrets are loaded from the local .env and Google ADC file; nothing sensitive is
printed.
"""

from __future__ import annotations

import json
import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException
from google.protobuf.field_mask_pb2 import FieldMask


ROOT = Path(__file__).resolve().parents[3]
CUSTOMER_ID = "4714692966"
CAMPAIGN_ID = "23816664121"
LEGACY_AD_GROUP_ID = "193915548417"

CAMPAIGN_NAME = "Zush Mac Search 2026Q2"
CAMPAIGN_RESOURCE = f"customers/{CUSTOMER_ID}/campaigns/{CAMPAIGN_ID}"
LEGACY_AD_GROUP_RESOURCE = f"customers/{CUSTOMER_ID}/adGroups/{LEGACY_AD_GROUP_ID}"


@dataclass(frozen=True)
class KeywordSpec:
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


AD_GROUPS: tuple[AdGroupSpec, ...] = (
    AdGroupSpec(
        name="Core AI File Renamer",
        utm_content="core_ai_file_renamer",
        final_url="https://zushapp.com/mac",
        path1="mac",
        keywords=(
            KeywordSpec("ai file renamer mac", "EXACT"),
            KeywordSpec("ai file renamer mac", "PHRASE"),
            KeywordSpec("ai file renamer for mac", "EXACT"),
            KeywordSpec("ai renamer mac", "EXACT"),
            KeywordSpec("file renamer ai mac", "PHRASE"),
            KeywordSpec("mac file renamer", "EXACT"),
            KeywordSpec("mac file renamer", "PHRASE"),
            KeywordSpec("automatic file renamer mac", "EXACT"),
        ),
        headlines=(
            "Zush AI File Renamer",
            "Official Zush for Mac",
            "Zush Batch Rename Tool",
            "Zush Mac File Renamer",
            "Zush PDF Photo Renamer",
            "Zush Folder Monitoring",
            "Zush BYOK Offline AI",
            "Zush Pro $38 One-Time",
            "Zush 50 AI Renames",
            "Zush Files Stay on Mac",
            "Zush for Apple Silicon",
            "Zush Rename PDFs Photos",
        ),
        descriptions=(
            "Zush renames screenshots, PDFs, photos and docs with AI. 50 renames included.",
            "Zush is a native Mac app for Apple Silicon and Intel. Batch rename folders.",
            "Use Zush to create searchable names while originals stay on your Mac.",
            "Replace IMG_4382 and download.pdf with clearer names in Zush.",
        ),
    ),
    AdGroupSpec(
        name="Screenshots Images Mac",
        utm_content="screenshots_images_mac",
        final_url="https://zushapp.com/rename-screenshots-with-ai",
        path1="screenshots",
        keywords=(
            KeywordSpec("screenshot renamer mac", "EXACT"),
            KeywordSpec("screenshot renamer mac", "PHRASE"),
            KeywordSpec("rename screenshots mac", "EXACT"),
            KeywordSpec("rename screenshots mac", "PHRASE"),
            KeywordSpec("auto rename screenshots mac", "PHRASE"),
            KeywordSpec("ai photo renamer mac", "EXACT"),
            KeywordSpec("ai photo renamer mac", "PHRASE"),
            KeywordSpec("ai image renamer mac", "EXACT"),
            KeywordSpec("rename photos mac", "PHRASE"),
        ),
        headlines=(
            "Auto-Rename Screenshots",
            "Screenshot Renamer Mac",
            "AI Image Renamer Mac",
            "Rename Photos on Mac",
            "50 AI Renames Included",
            "Native macOS App",
            "RAW, HEIC, JPG Support",
            "Files Stay on Your Mac",
            "Batch Rename Photos",
            "Folder Monitoring",
        ),
        descriptions=(
            "Turn screenshots and images into searchable filenames with AI.",
            "Rename screenshots, HEIC, RAW, JPG and PNG files. No signup required.",
            "Use batch rename, folder monitoring and one-click revert in a native Mac app.",
            "Clean up timestamp screenshots and IMG_ files without manual naming.",
        ),
    ),
    AdGroupSpec(
        name="PDF Docs Downloads Mac",
        utm_content="pdf_docs_downloads_mac",
        final_url="https://zushapp.com/rename-pdf-with-ai",
        path1="pdf-renamer",
        keywords=(
            KeywordSpec("pdf renamer mac", "EXACT"),
            KeywordSpec("pdf renamer mac", "PHRASE"),
            KeywordSpec("rename pdf files mac", "EXACT"),
            KeywordSpec("rename pdf files mac", "PHRASE"),
            KeywordSpec("rename pdf files with ai mac", "PHRASE"),
            KeywordSpec("ai pdf renamer mac", "EXACT"),
            KeywordSpec("automatic file renamer mac", "PHRASE"),
        ),
        headlines=(
            "Rename PDFs with AI",
            "PDF Renamer for Mac",
            "Clean Up Downloads Fast",
            "AI File Organizer Mac",
            "Auto-Rename Mac Files",
            "50 AI Renames Included",
            "PDF, DOCX, XLSX Support",
            "Files Stay on Your Mac",
            "Native macOS App",
            "One-Time $38 Pro",
        ),
        descriptions=(
            "Rename PDFs, documents, screenshots and downloads by their content on Mac.",
            "Clean up download.pdf and scan_0042 files with AI-generated names.",
            "Batch rename old folders or monitor new downloads. 50 renames included.",
            "Works with PDFs, Office docs, iWork files, screenshots, photos and more.",
        ),
    ),
    AdGroupSpec(
        name="Alternatives Competitors",
        utm_content="alternatives_competitors",
        final_url="https://zushapp.com/blog/best-ai-file-renamer-tools-mac-compared",
        path1="compare",
        keywords=(
            KeywordSpec("best ai file renamer mac", "EXACT"),
            KeywordSpec("best ai file renamer for mac", "PHRASE"),
            KeywordSpec("best file renamer for mac", "EXACT"),
            KeywordSpec("best batch file renaming tools 2026", "PHRASE"),
            KeywordSpec("namequick", "EXACT"),
            KeywordSpec("namequick app", "PHRASE"),
            KeywordSpec("renameclick", "EXACT"),
            KeywordSpec("renamer ai", "EXACT"),
        ),
        headlines=(
            "Best AI File Renamer Mac",
            "Compare AI Renamers",
            "Zush for Mac",
            "Native macOS App",
            "50 AI Renames Included",
            "One-Time $38 Pro",
            "Files Stay on Your Mac",
            "BYOK and Offline AI",
        ),
        descriptions=(
            "Compare Mac AI file renamers, then try Zush with 50 AI renames included.",
            "A native Mac AI renamer for screenshots, PDFs, photos and documents.",
            "See how Zush compares on formats, folder monitoring, undo, BYOK and price.",
            "Choose a Mac file renamer built for recurring file cleanup workflows.",
        ),
    ),
)

NEGATIVE_KEYWORDS: tuple[str, ...] = (
    "windows",
    "linux",
    "android",
    "iphone",
    "ios",
    "online",
    "free online",
    "web upload",
    "mp3",
    "music",
    "movie",
    "tv show",
    "subtitle",
    "powershell",
    "bash",
    "terminal",
    "python",
    "regex",
    "automator",
    "finder only",
    "hazel official",
    "official site",
    "ollama server",
    "update ollama",
    "open source",
    "github",
    "apk",
    "crack",
    "serial key",
    "pirated",
    "torrent",
)

SITELINKS: tuple[tuple[str, str, str, str], ...] = (
    ("Zush for Mac", "Native macOS app", "50 AI renames", "https://zushapp.com/mac"),
    ("Rename Screenshots", "AI names for screenshots", "Works with PNG and JPG", "https://zushapp.com/rename-screenshots-with-ai"),
    ("Rename PDFs", "Invoices and contracts", "Searchable PDF filenames", "https://zushapp.com/rename-pdf-with-ai"),
    ("Batch Rename Files", "Handle folders at once", "Review before applying", "https://zushapp.com/batch-rename-files"),
    ("Best AI Renamers", "Compare Mac AI tools", "Formats, privacy, price", "https://zushapp.com/blog/best-ai-file-renamer-tools-mac-compared"),
)

CALLOUTS: tuple[str, ...] = (
    "50 AI Renames",
    "No Signup",
    "No Credit Card",
    "Monthly $8 Pro",
    "One-Time $38 Pro",
    "Signed .dmg",
    "Mac App Store Option",
    "Apple Silicon + Intel",
    "BYOK Supported",
    "Offline AI Mode",
    "145+ Naming Blocks",
    "14-Day Refund",
)


def load_client() -> GoogleAdsClient:
    load_dotenv(ROOT / ".env")
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
        "utm_source=google&utm_medium=cpc&utm_campaign=zush_mac_search_2026q2"
        "&utm_content=campaign_fallback&utm_term={keyword}&utm_device={device}"
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
            ad_group.cpc_bid_micros = 10_000
            ad_group.final_url_suffix = ad_group_final_url_suffix(spec)
            operations.append(op)
        result = service.mutate_ad_groups(customer_id=CUSTOMER_ID, operations=operations)
        for spec, item in zip(missing, result.results):
            existing[spec.name] = item.resource_name
            print("created ad group", spec.name, item.resource_name)

    return {spec.name: existing[spec.name] for spec in AD_GROUPS}


def ad_group_final_url_suffix(spec: AdGroupSpec) -> str:
    return (
        "utm_source=google&utm_medium=cpc&utm_campaign=zush_mac_search_2026q2"
        f"&utm_content={spec.utm_content}&utm_term={{keyword}}"
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
            if not row.ad_group_criterion.negative
        }
        operations = []
        for keyword in spec.keywords:
            key = (keyword.text.lower(), keyword.match_type)
            if key in existing:
                continue
            op = client.get_type("AdGroupCriterionOperation")
            criterion = op.create
            criterion.ad_group = ad_group
            criterion.status = enum_value(client, "AdGroupCriterionStatusEnum", "ENABLED")
            criterion.keyword.text = keyword.text
            criterion.keyword.match_type = enum_value(client, "KeywordMatchTypeEnum", keyword.match_type)
            operations.append(op)
        if operations:
            criterion_service.mutate_ad_group_criteria(customer_id=CUSTOMER_ID, operations=operations)
        print("keywords ready", spec.name, len(operations), "created")


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
    for text in NEGATIVE_KEYWORDS:
        key = (text.lower(), "PHRASE")
        if key in existing:
            continue
        op = client.get_type("CampaignCriterionOperation")
        criterion = op.create
        criterion.campaign = CAMPAIGN_RESOURCE
        criterion.negative = True
        criterion.keyword.text = text
        criterion.keyword.match_type = enum_value(client, "KeywordMatchTypeEnum", "PHRASE")
        operations.append(op)
    if operations:
        client.get_service("CampaignCriterionService").mutate_campaign_criteria(
            customer_id=CUSTOMER_ID, operations=operations
        )
    print("campaign negatives ready", len(operations), "created")


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
    client = load_client()
    update_campaign(client)
    remove_legacy_ad_group(client)
    ad_groups = ensure_ad_groups(client)
    update_ad_group_suffixes(client, ad_groups)
    ensure_keywords(client, ad_groups)
    ensure_negative_keywords(client)
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

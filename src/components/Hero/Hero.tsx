import { Fragment, type ReactNode } from "react";
import FileShowcase from "../FileShowcase";
import type { Slide } from "../FileShowcase";
import DownloadButton from "../DownloadButton";
import Heading from "../Heading";
import StarRating from "../StarRating";
import Text from "../Text";
import HeroVideoShowcase from "./HeroVideoShowcase";
import styles from "./Hero.module.scss";
import type { DownloadOS } from "@/utils/download";
import { useOS } from "@/hooks/useOS";
import type { DownloadMenuCopy } from "@/i18n/copy";
import type { HeroVideoShowcaseAsset } from "@/data/showcaseMedia";


interface HeroProps {
  title?: ReactNode;
  titleAccent?: string;
  titleHighlight?: string;
  subtitle?: string;
  subtitleHighlights?: string[];
  slides?: Slide[];
  videoShowcase?: HeroVideoShowcaseAsset;
  videoShowcaseByOS?: Partial<Record<DownloadOS, HeroVideoShowcaseAsset>>;
  as?: "section" | "header";
  compactTopSpacing?: boolean;
  forceOS?: DownloadOS;
  secondaryHref?: string;
  buyLabel?: string;
  downloadLabel?: string;
  downloadEdgeLabel?: string;
  downloadMenu?: DownloadMenuCopy;
  includeOtherDownloadOS?: boolean;
  trustSignals?: string[];
  aiModes?: string[];
  reviewsHref?: string;
  reviewsLabel?: string;
  macVersion?: string;
  windowsVersion?: string;
}

const renderTextWithBreaks = (value: string) =>
  value.split("\n").map((part, index) => (
    <Fragment key={`${part}-${index}`}>
      {index > 0 && (
        <>
          {" "}
          <br />
        </>
      )}
      {part}
    </Fragment>
  ));

const renderHighlightedText = (value: string, highlights: string[]) => {
  const matches = highlights
    .map((highlight) => ({ highlight, index: value.indexOf(highlight) }))
    .filter((match) => match.highlight && match.index >= 0)
    .sort((a, b) => a.index - b.index);

  if (matches.length === 0) return value;

  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const match of matches) {
    if (match.index < cursor) continue;
    if (match.index > cursor) parts.push(value.slice(cursor, match.index));
    parts.push(
      <mark className={styles.Hero__SubtitleHighlight} key={`${match.highlight}-${match.index}`}>
        {match.highlight}
      </mark>,
    );
    cursor = match.index + match.highlight.length;
  }

  if (cursor < value.length) parts.push(value.slice(cursor));
  return parts;
};

const Hero = ({
  title,
  titleAccent,
  titleHighlight,
  subtitle,
  subtitleHighlights = [],
  slides,
  as: Tag = "section",
  compactTopSpacing = false,
  forceOS,
  downloadLabel = "Download",
  downloadMenu,
  includeOtherDownloadOS = true,
  trustSignals = ["✨ Free to try", "💳 No credit card required"],
  aiModes = [],
  reviewsHref,
  reviewsLabel = "Reviews",
  macVersion,
  windowsVersion,
  videoShowcase,
  videoShowcaseByOS,
}: HeroProps) => {
  const highlightText = titleHighlight ?? titleAccent;
  const { downloadOS: detectedOS } = useOS();
  const versionOS = forceOS ?? detectedOS;
  const selectedVideoShowcase = videoShowcaseByOS?.[versionOS] ?? videoShowcase;
  const platformVersion = versionOS === "windows" ? windowsVersion : macVersion;
  const finalTrustSignals = platformVersion
    ? [`🤖 v${platformVersion}`, ...trustSignals]
    : trustSignals;

  const renderTitle = () => {
    if (!title) {
      return (
        <>
          <span className={styles.Hero__TitleAccent}>File Renamer</span>
          {" "}
          <br />
          for Mac & Windows
        </>
      );
    }

    if (typeof title === "string" && highlightText) {
      const highlightIndex = title.indexOf(highlightText);
      if (highlightIndex !== -1) {
        const before = title.slice(0, highlightIndex);
        const after = title.slice(highlightIndex + highlightText.length);

        return (
          <>
            {renderTextWithBreaks(before)}
            <span className={styles.Hero__TitleAccent}>{renderTextWithBreaks(highlightText)}</span>
            {renderTextWithBreaks(after)}
          </>
        );
      }
    }

    if (typeof title === "string") {
      return <>{renderTextWithBreaks(title)}</>;
    }

    return title;
  };

  return (
    <Tag
      data-hero-root
      className={[
        styles.Hero,
        compactTopSpacing ? styles.Hero_compactTopSpacing : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.Hero__Container}>
        <div className={styles.Hero__Intro}>
          {(reviewsHref || aiModes.length > 0) && (
            <div className={styles.Hero__ProofRow}>
              {reviewsHref && (
                <a className={styles.Hero__RatingLink} href={reviewsHref} aria-label={reviewsLabel}>
                  <StarRating decorative />
                </a>
              )}
              {aiModes.length > 0 && (
                <ul className={styles.Hero__ModeRow} aria-label="AI modes">
                  {aiModes.map((mode) => (
                    <li className={styles.Hero__ModeBadge} key={mode}>
                      {mode}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <Heading as="h1" className={styles.Hero__Title}>
            {renderTitle()}
          </Heading>
          <Text
            size="lg"
            color="base"
            className={[
              styles.Hero__Subtitle,
              subtitleHighlights.length > 0 ? styles.Hero__Subtitle_compact : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {renderHighlightedText(
              subtitle ??
                "Batch rename and bulk rename files by content with AI: screenshots, PDFs, photos, videos, audio, design files, iWork and Office documents. Watch folders, reuse templates, and undo any rename.",
              subtitleHighlights,
            )}
          </Text>

          <div className={styles.Hero__ActionRow}>
            <div className={styles.Hero__Buttons}>
              <DownloadButton
                source="hero"
                variant="primaryGlass"
                size="lg"
                forceOS={forceOS}
                label={downloadLabel}
                menuCopy={downloadMenu}
                includeOtherOS={includeOtherDownloadOS}
              />
            </div>
            {finalTrustSignals.length > 0 && (
              <ul className={styles.Hero__TrustRow} aria-label="Trust signals">
                {finalTrustSignals.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div
          className={`${styles.Hero__ShowcaseWrapper} ${styles.Hero__ShowcaseMotion}`}
        >
          {selectedVideoShowcase ? (
            <HeroVideoShowcase media={selectedVideoShowcase} />
          ) : (
            <FileShowcase slides={slides} />
          )}
          <div className={styles.Hero__GlowEffect} />
        </div>
      </div>
    </Tag>
  );
};

export default Hero;

import { Fragment, type ReactNode } from "react";
import FileShowcase from "../FileShowcase";
import type { Slide } from "../FileShowcase";
import Button from "../Button";
import DownloadButton from "../DownloadButton";
import Heading from "../Heading";
import Text from "../Text";
import styles from "./Hero.module.scss";
import { trackProClick, type DownloadOS } from "@/utils/download";
import type { DownloadMenuCopy } from "@/i18n/copy";


export interface HeroProps {
  title?: ReactNode;
  titleAccent?: string;
  titleHighlight?: string;
  subtitle?: string;
  slides?: Slide[];
  as?: "section" | "header";
  compactTopSpacing?: boolean;
  forceOS?: DownloadOS;
  secondaryHref?: string;
  buyLabel?: string;
  downloadLabel?: string;
  downloadMenu?: DownloadMenuCopy;
  includeOtherDownloadOS?: boolean;
  trustSignals?: string[];
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

const Hero = ({
  title,
  titleAccent,
  titleHighlight,
  subtitle,
  slides,
  as: Tag = "section",
  compactTopSpacing = false,
  forceOS,
  secondaryHref = "/#pricing",
  buyLabel = "Buy 🌟 PRO",
  downloadLabel = "Download",
  downloadMenu,
  includeOtherDownloadOS = true,
  trustSignals = ["✨ Free to try", "💳 No credit card", "🚫 No subscription"],
}: HeroProps) => {
  const highlightText = titleHighlight ?? titleAccent;

  const renderTitle = () => {
    if (!title) {
      return (
        <>
          <span className={styles.Hero__TitleAccent}>AI File Renamer</span>
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
          <Heading as="h1" className={styles.Hero__Title}>
            {renderTitle()}
          </Heading>
          <Text size="xl" color="subtle" className={styles.Hero__Subtitle}>
            {subtitle ??
              "Batch rename files with AI, watch folders automatically, and organize screenshots, PDFs, photos, videos, and documents with searchable names based on real content."}
          </Text>

          <div className={styles.Hero__Buttons}>
            <DownloadButton
              source="hero"
              size="lg"
              forceOS={forceOS}
              label={downloadLabel}
              menuCopy={downloadMenu}
              includeOtherOS={includeOtherDownloadOS}
            />
            <Button
              as="link"
              href={secondaryHref}
              variant="primary"
              size="lg"
              onClick={() => trackProClick({ source: "hero" })}
            >
              {buyLabel}
            </Button>
          </div>
          <ul className={styles.Hero__TrustRow} aria-label="Trust signals">
            {trustSignals.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div
          className={`${styles.Hero__ShowcaseWrapper} ${styles.Hero__ShowcaseMotion}`}
        >
          <FileShowcase slides={slides} />
          <div className={styles.Hero__GlowEffect} />
        </div>
      </div>
    </Tag>
  );
};

export default Hero;

import { Fragment, type ReactNode } from "react";
import FileShowcase from "../FileShowcase";
import type { Slide } from "../FileShowcase";
import Button from "../Button";
import DownloadButton from "../DownloadButton";
import Heading from "../Heading";
import Text from "../Text";
import styles from "./Hero.module.scss";
import { trackProClick, type DownloadOS } from "@/utils/download";
import { useOS } from "@/hooks/useOS";
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
  trustSignals = ["✨ Free to try", "💳 No credit card required"],
  macVersion,
  windowsVersion,
}: HeroProps) => {
  const highlightText = titleHighlight ?? titleAccent;
  const { downloadOS: detectedOS } = useOS();
  const versionOS = forceOS ?? detectedOS;
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
          <Heading as="h1" className={styles.Hero__Title}>
            {renderTitle()}
          </Heading>
          <Text size="lg" color="subtle" className={styles.Hero__Subtitle}>
            {subtitle ??
              "Batch rename and bulk rename files by content with AI: screenshots, PDFs, photos, videos, audio, design files, iWork and Office documents. Watch folders, reuse templates, and undo any rename."}
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
              glass
              onClick={() => trackProClick({ source: "hero" })}
            >
              {buyLabel}
            </Button>
          </div>
          {finalTrustSignals.length > 0 && (
            <ul className={styles.Hero__TrustRow} aria-label="Trust signals">
              {finalTrustSignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
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

import { type ReactNode } from "react";
import FileShowcase from "../FileShowcase";
import type { Slide } from "../FileShowcase";
import HeroRenameDemo from "../HeroRenameDemo";
import Button from "../Button";
import DownloadButton from "../DownloadButton";
import Heading from "../Heading";
import Text from "../Text";
import styles from "./Hero.module.scss";
import type { DownloadOS } from "@/utils/download";
import type { DownloadMenuCopy, RenameDemoCopy } from "@/i18n/copy";
import type { Locale } from "@/i18n/config";


interface HeroProps {
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
  trustSignals?: string[];
  renameDemo?: RenameDemoCopy;
  locale?: Locale;
  showInteractiveDemo?: boolean;
}

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
  trustSignals = ["✨ Free to try", "💳 No credit card", "🚫 No subscription"],
  renameDemo,
  locale,
  showInteractiveDemo = false,
}: HeroProps) => {
  const highlightText = titleHighlight ?? titleAccent;

  const renderTitle = () => {
    if (!title) {
      return (
        <>
          Rename Files with AI.
          <br />
          <span className={styles.Hero__TitleAccent}>Automatically.</span>
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
            {before}
            <span className={styles.Hero__TitleAccent}>{highlightText}</span>
            {after}
          </>
        );
      }
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
              "Blazing fast AI file renamer for Mac and Windows. Auto-rename screenshots, PDFs, and documents with meaningful names — folder watching, BYOK, and offline AI built in."}
          </Text>

          <div className={styles.Hero__Buttons}>
            <DownloadButton source="hero" size="lg" forceOS={forceOS} label={downloadLabel} menuCopy={downloadMenu} />
            <Button
              as="link"
              href={secondaryHref}
              variant="primary"
              size="lg"
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
          {showInteractiveDemo && renameDemo ? (
            <>
              <div className={styles.Hero__InteractiveShowcase}>
                <HeroRenameDemo
                  copy={renameDemo}
                  downloadLabel={downloadLabel}
                  downloadMenu={downloadMenu}
                  locale={locale}
                  forceOS={forceOS}
                />
              </div>
              <div className={styles.Hero__MobileShowcase}>
                <FileShowcase slides={slides} />
              </div>
            </>
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

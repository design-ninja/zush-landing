import { type ReactNode } from "react";
import FileShowcase from "../FileShowcase";
import type { Slide } from "../FileShowcase";
import Button from "../Button";
import DownloadButton from "../DownloadButton";
import Heading from "../Heading";
import Text from "../Text";
import styles from "./Hero.module.scss";


interface HeroProps {
  title?: ReactNode;
  titleAccent?: string;
  subtitle?: string;
  slides?: Slide[];
  as?: "section" | "header";
  compactTopSpacing?: boolean;
}

const Hero = ({
  title,
  titleAccent,
  subtitle,
  slides,
  as: Tag = "section",
  compactTopSpacing = false,
}: HeroProps) => {
  return (
    <Tag
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
            {title ? (
              typeof title === "string" && titleAccent && title.startsWith(titleAccent) ? (
                <>
                  <span className={styles.Hero__TitleAccent}>{titleAccent}</span>
                  {title.slice(titleAccent.length)}
                </>
              ) : (
                title
              )
            ) : (
              <>
                Rename Files with AI.
                <br />
                <span className={styles.Hero__TitleAccent}>Automatically.</span>
              </>
            )}
          </Heading>
          <Text size="xl" color="subtle" className={styles.Hero__Subtitle}>
            {subtitle ??
              "Blazing fast AI file renamer for Mac and Windows. Auto rename screenshots, PDFs, documents, and downloads with meaningful names — free to try."}
          </Text>

          <div className={styles.Hero__Buttons}>
            <DownloadButton source="hero" size="lg" />
            <Button
              as="link"
              href="/#pricing"
              variant="primary"
              size="lg"
            >
              Buy 🌟 PRO
            </Button>
          </div>
          <ul className={styles.Hero__TrustRow} aria-label="Trust signals">
            <li>✨ Free to try</li>
            <li>💳 No credit card</li>
            <li>🚫 No subscription</li>
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

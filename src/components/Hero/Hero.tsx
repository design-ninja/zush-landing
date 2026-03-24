import { lazy, Suspense, useState, type ReactNode } from "react";
import FileShowcase from "../FileShowcase";
import type { Slide } from "../FileShowcase";
import Button from "../Button";
import Heading from "../Heading";
import Text from "../Text";
import AppleIcon from "../AppleIcon";
import { useIsMobile } from "@/hooks/useIsMobile";
import { DOWNLOAD_URL } from "@/constants";
import styles from "./Hero.module.scss";

const MobileDownloadModal = lazy(() => import("../MobileDownloadModal"));

interface HeroProps {
  title?: ReactNode;
  subtitle?: string;
  slides?: Slide[];
  as?: "section" | "header";
}

const Hero = ({ title, subtitle, slides, as: Tag = "section" }: HeroProps) => {
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasLoadedModal, setHasLoadedModal] = useState(false);

  const handleDownloadClick = () => {
    if (isMobile) {
      setHasLoadedModal(true);
      setIsModalOpen(true);
    } else {
      window.open(DOWNLOAD_URL, "_blank");
    }
  };

  return (
    <Tag className={styles.Hero}>
      <div className={styles.Hero__Container}>
        <div className={styles.Hero__Intro}>
          <Heading as="h1" className={styles.Hero__Title}>
            {title ?? (
              <>
                Rename Files with AI.
                <br />
                <span className={styles.Hero__TitleAccent}>Automatically.</span>
              </>
            )}
          </Heading>
          <Text size="xl" color="subtle" className={styles.Hero__Subtitle}>
            {subtitle ??
              "The AI file renamer for macOS. Auto rename screenshots, PDFs, documents, and downloads with meaningful names — free to try."}
          </Text>

          <div className={styles.Hero__Buttons}>
            {isMobile ? (
              <Button
                variant="black"
                size="lg"
                onClick={handleDownloadClick}
              >
                <AppleIcon />
                Download
              </Button>
            ) : (
              <Button
                as="a"
                href={DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="black"
                size="lg"
              >
                <AppleIcon />
                Download
              </Button>
            )}
            <Button
              as="link"
              href="/#pro"
              variant="primary"
              size="lg"
            >
              Buy 🌟 PRO
            </Button>
          </div>
          <p className={styles.Hero__FreeLabel}>Free, no credit card required</p>
        </div>

        {hasLoadedModal && (
          <Suspense fallback={null}>
            <MobileDownloadModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </Suspense>
        )}

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

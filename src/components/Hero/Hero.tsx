import { useState } from "react";
import FileShowcase from "../FileShowcase";
import Button from "../Button";
import Heading from "../Heading";
import Text from "../Text";
import AppleIcon from "../AppleIcon";
import MobileDownloadModal from "../MobileDownloadModal";
import { useIsMobile } from "@/hooks/useIsMobile";
import { DOWNLOAD_URL } from "@/constants";
import styles from "./Hero.module.scss";

const Hero = () => {
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownloadClick = () => {
    if (isMobile) {
      setIsModalOpen(true);
    } else {
      window.open(DOWNLOAD_URL, "_blank");
    }
  };

  return (
    <section className={`${styles.Hero} hero`}>
      <div className={`${styles.Hero__Container} hero__container`}>
        <div className={`${styles.Hero__Intro} hero__intro`}>
          <Heading as="h1" className={`${styles.Hero__Title} hero__title`}>
            Stop Naming Images.{" "}
            <span className={`${styles.Hero__TitleAccent} hero__title-accent`}>
              Let AI Do It.
            </span>
          </Heading>
          <Text
            size="xl"
            color="subtle"
            className={`${styles.Hero__Subtitle} hero__subtitle`}
          >
            Zush gives your files meaningful AI-powered names — automatically.
            Find any photo in seconds, not minutes.
          </Text>

          <div className={`${styles.Hero__Buttons} hero__buttons`}>
            {isMobile ? (
              <Button
                variant="black"
                size="lg"
                className="hero__cta hero__cta--black"
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
                className="hero__cta hero__cta--black"
              >
                <AppleIcon />
                Download
              </Button>
            )}
            <Button
              as="a"
              href="#pro"
              variant="primary"
              size="lg"
              className="hero__cta hero__cta--primary"
            >
              Buy 🌟 PRO
            </Button>
          </div>
          <p className={`${styles.Hero__FreeLabel} hero__free`}>
            Free, no credit card required
          </p>
        </div>

        <MobileDownloadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <div
          className={`${styles.Hero__ShowcaseWrapper} ${styles.Hero__ShowcaseMotion} hero__showcase`}
        >
          <FileShowcase />
          <div className={styles.Hero__GlowEffect} />
        </div>
      </div>
    </section>
  );
};

export default Hero;

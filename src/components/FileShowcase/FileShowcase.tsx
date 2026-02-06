import { CSSProperties, useEffect, useState } from "react";
import styles from "./FileShowcase.module.scss";

interface FileItem {
  before: string;
  after: string;
  img: string;
}

interface Slide {
  files: FileItem[];
}

const slides: Slide[] = [
  {
    files: [
      {
        before: "IMG_0842.JPG",
        after: "Pug In Yellow Beanie.png",
        img: "/images/examples/pug.jpg",
      },
      {
        before: "Screenshot 2024-08-08 at 09.14.25.png",
        after: "TechnicalDashboard.png",
        img: "/images/examples/dashboard.jpg",
      },
      {
        before: "IMG_4821.JPG",
        after: "Serene_Beach_Sunset.jpg",
        img: "/images/examples/sunset.jpg",
      },
      {
        before: "73819203_edit.png",
        after: "Cat On A Table.png",
        img: "/images/examples/cat.jpg",
      },
      {
        before: "Export_Data_v2.png",
        after: "Laptop_With_Graph.png",
        img: "/images/examples/chart.jpg",
      },
      {
        before: "Untilted project(3).png",
        after: "Context-Diagram-Components.png",
        img: "/images/examples/diagram.jpg",
      },
    ],
  },
  {
    files: [
      {
        before: "DSC_9921.jpg",
        after: "mountainrangeatSunset.jpg",
        img: "/images/examples/mountain.jpg",
      },
      {
        before: "photo_2024_03_15.png",
        after: "COFFEE_CUPS_TOGETHER.png",
        img: "/images/examples/coffee.jpg",
      },
      {
        before: "final_v3_FINAL.jpg",
        after: "modern office interior.jpg",
        img: "/images/examples/office.jpg",
      },
      {
        before: "IMG_20240812_143052.jpg",
        after: "HappyDogOnBeach.jpg",
        img: "/images/examples/dog.jpg",
      },
      {
        before: "received_1847362910.jpeg",
        after: "Delicious_Asian_Style_Beef.jpeg",
        img: "/images/examples/food.jpg",
      },
      {
        before: "Screenshot_20240915-182634.png",
        after: "New-York-City-Skyline.png",
        img: "/images/examples/city.jpg",
      },
    ],
  },
  {
    files: [
      {
        before: "PXL_20240720_091234.jpg",
        after: "vibrant_yellow_flowers.jpg",
        img: "/images/examples/flowers.jpg",
      },
      {
        before: "CAM00847.jpg",
        after: "BlackFordMustang.jpg",
        img: "/images/examples/car.jpg",
      },
      {
        before: "image(47).png",
        after: "FOREST_PATH_SCENE.png",
        img: "/images/examples/nature.jpg",
      },
      {
        before: "photo_6282910374.jpg",
        after: "Skyscrapers From Below.jpg",
        img: "/images/examples/building.jpg",
      },
      {
        before: "Screenshot 2024-11-02.png",
        after: "modern_office_interior.png",
        img: "/images/examples/workspace.jpg",
      },
      {
        before: "DJI_0234.JPG",
        after: "Mountain_Range_Aerial.jpg",
        img: "/images/examples/mountain.jpg",
      },
    ],
  },
];

const FileShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion]);

  return (
    <div
      className={styles.FileShowcase}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div key={currentSlide} className={styles.FileShowcase__Grid}>
        {slides[currentSlide].files.map((file, i) => {
          const isPriority = currentSlide === 0 && i < 4;
          const itemStyle = {
            "--item-delay": `${i * 80}ms`,
          } as CSSProperties;

          return (
            <div
              key={`${currentSlide}-${i}`}
              className={`${styles.FileItem} ${prefersReducedMotion ? styles.FileItem_static : ""}`}
              style={itemStyle}
            >
              <picture>
                <source
                  srcSet={file.img.replace(/\.jpg$/i, ".webp")}
                  type="image/webp"
                />
                <img
                  src={file.img}
                  alt="Zush App AI File Rename Example Image"
                  className={styles.FileItem__Image}
                  width={64}
                  height={64}
                  loading={isPriority ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={isPriority ? "high" : "auto"}
                />
              </picture>
              <div className={styles.FileItem__Content}>
                <div className={styles.FileItem__Before}>{file.before}</div>
                <div className={styles.FileItem__After}>{file.after}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FileShowcase;

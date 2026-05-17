import { CSSProperties, useEffect, useState } from "react";
import { FileAudio2, FileSpreadsheet, FileText, FileType2, Film, Palette, Presentation } from "lucide-react";
import { VIDEO_PREVIEW_IMAGES } from "@/data/videoPreviewImages";
import styles from "./FileShowcase.module.scss";

export interface FileItem {
  before: string;
  after: string;
  img?: string;
  type: "image" | "design" | "doc" | "sheet" | "slides" | "pdf" | "video" | "audio";
  label?: string;
}

export interface Slide {
  files: FileItem[];
}

const defaultSlides: Slide[] = [
  {
    files: [
      {
        before: "IMG_0842.JPG",
        after: "Pug In Yellow Beanie.jpg",
        img: "/images/examples/pug.jpg",
        type: "image",
      },
      {
        before: "track_01_final.mp3",
        after: "Lo-Fi Piano Loop 92BPM.mp3",
        type: "audio",
      },
      {
        before: "checkout-flow.fig",
        after: "Mobile Checkout Flow.fig",
        type: "design",
        label: "FIG",
      },
      {
        before: "budget_export_copy(2).xlsx",
        after: "Product Launch Budget.xlsx",
        type: "sheet",
      },
      {
        before: "client-brief-scan.pdf",
        after: "Client Creative Brief.pdf",
        type: "pdf",
      },
      {
        before: "demo_take_02.mov",
        after: "Settings Sidebar Walkthrough.mov",
        img: VIDEO_PREVIEW_IMAGES.settingsSidebarWalkthrough,
        type: "video",
      },
    ],
  },
  {
    files: [
      {
        before: "voice_memo_042.m4a",
        after: "Client Discovery Call.m4a",
        type: "audio",
      },
      {
        before: "notes_from_call_FINAL.docx",
        after: "Hiring Plan Notes.docx",
        type: "doc",
      },
      {
        before: "forecast_2026-03-18_export.xlsx",
        after: "Revenue Forecast.xlsx",
        type: "sheet",
      },
      {
        before: "IMG_20240812_143052.jpg",
        after: "HappyDogOnBeach.jpg",
        img: "/images/examples/dog.jpg",
        type: "image",
      },
      {
        before: "proposal_draft_approved.pdf",
        after: "Website Proposal.pdf",
        type: "pdf",
      },
      {
        before: "Screen Recording 2026-05-08.mov",
        after: "Checkout Flow Bug Recording.mov",
        img: VIDEO_PREVIEW_IMAGES.checkoutFlowBugRecording,
        type: "video",
      },
    ],
  },
  {
    files: [
      {
        before: "contract_notes_clean.docx",
        after: "Vendor Contract Notes.docx",
        type: "doc",
      },
      {
        before: "pipeline_export_march.xlsx",
        after: "Sales Pipeline March.xlsx",
        type: "sheet",
      },
      {
        before: "brand-system.sketch",
        after: "Brand Component Library.sketch",
        type: "design",
        label: "SKETCH",
      },
      {
        before: "scan_2026_03_19.pdf",
        after: "Signed Service Agreement.pdf",
        type: "pdf",
      },
      {
        before: "PXL_20240720_091234.jpg",
        after: "Vibrant Yellow Flowers.jpg",
        img: "/images/examples/flowers.jpg",
        type: "image",
      },
      {
        before: "camera_roll_0091.m2ts",
        after: "Factory Tour Assembly.m2ts",
        img: VIDEO_PREVIEW_IMAGES.factoryTourAssembly,
        type: "video",
      },
    ],
  },
];

const fileTypeConfig = {
  design: { icon: Palette, label: "FIG", className: styles.FileItem__Preview_design },
  doc: { icon: FileText, label: "DOCX", className: styles.FileItem__Preview_doc },
  sheet: { icon: FileSpreadsheet, label: "XLSX", className: styles.FileItem__Preview_sheet },
  slides: { icon: Presentation, label: "PPTX", className: styles.FileItem__Preview_slides },
  pdf: { icon: FileType2, label: "PDF", className: styles.FileItem__Preview_pdf },
  video: { icon: Film, label: "MP4", className: styles.FileItem__Preview_video },
  audio: { icon: FileAudio2, label: "MP3", className: styles.FileItem__Preview_audio },
} as const;
type NonImageFileType = Exclude<FileItem['type'], 'image'>;

interface FileShowcaseProps {
  slides?: Slide[];
}

const FileShowcase = ({ slides: customSlides }: FileShowcaseProps = {}) => {
  const slides = customSlides || defaultSlides;
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
  }, [isPaused, prefersReducedMotion, slides]);

  return (
    <div
      className={styles.FileShowcase}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div key={currentSlide} className={styles.FileShowcase__Grid}>
        {slides[currentSlide].files.map((file, i) => {
          const itemStyle = {
            "--item-delay": `${i * 80}ms`,
          } as CSSProperties;

          return (
            <div
              key={`${currentSlide}-${i}`}
              className={`${styles.FileItem} ${prefersReducedMotion ? styles.FileItem_static : ""}`}
              style={itemStyle}
            >
              {file.img ? (
                <picture>
                  <source
                    srcSet={file.img.replace(/\.jpg$/i, ".webp")}
                    type="image/webp"
                  />
                  <img
                    src={file.img}
                    alt=""
                    className={styles.FileItem__Image}
                    width={64}
                    height={64}
                    loading="eager"
                    decoding="async"
                  />
                </picture>
              ) : (
                (() => {
                  const fileType = file.type as NonImageFileType;
                  const preview = fileTypeConfig[fileType];
                  const Icon = preview.icon;

                  return (
                    <div
                      className={`${styles.FileItem__Preview} ${preview.className}`}
                      aria-hidden="true"
                    >
                      <Icon size={26} strokeWidth={2.45} />
                      <span className={styles.FileItem__Badge}>{file.label ?? preview.label}</span>
                    </div>
                  );
                })()
              )}
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

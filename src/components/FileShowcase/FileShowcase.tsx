import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FileShowcase.module.scss';

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
        before: 'IMG_0842.JPG',
        after: 'Cute Pug Portrait.png',
        img: '/images/examples/pug.jpg',
      },
      {
        before: 'Screenshot 2024-08-08 at 09.14.25.png',
        after: 'DashboardAnalytics.png',
        img: '/images/examples/dashboard.jpg',
      },
      {
        before: 'IMG_4821.JPG',
        after: 'Golden_Hour_Sunset.jpg',
        img: '/images/examples/sunset.jpg',
      },
      {
        before: '73819203_edit.png',
        after: 'Black And White Cat.png',
        img: '/images/examples/cat.jpg',
      },
      {
        before: 'Export_Data_v2.png',
        after: 'Revenue_Chart_Q3.png',
        img: '/images/examples/chart.jpg',
      },
      {
        before: 'Untilted project(3).png',
        after: 'Architecture-Diagram.png',
        img: '/images/examples/diagram.jpg',
      },
    ],
  },
  {
    files: [
      {
        before: 'DSC_9921.RAW',
        after: 'mountainpeak.jpg',
        img: '/images/examples/mountain.jpg',
      },
      {
        before: 'photo_2024_03_15.png',
        after: 'MORNING_COFFEE_SHOT.png',
        img: '/images/examples/coffee.jpg',
      },
      {
        before: 'final_v3_FINAL.jpg',
        after: 'modern office interior.jpg',
        img: '/images/examples/office.jpg',
      },
      {
        before: 'IMG_20240812_143052.jpg',
        after: 'GoldenRetriever.jpg',
        img: '/images/examples/dog.jpg',
      },
      {
        before: 'received_1847362910.jpeg',
        after: 'Pasta_Carbonara_Recipe.jpeg',
        img: '/images/examples/food.jpg',
      },
      {
        before: 'Screenshot_20240915-182634.png',
        after: 'Night-CitySkyline-2026.png',
        img: '/images/examples/city.jpg',
      },
    ],
  },
  {
    files: [
      {
        before: 'PXL_20240720_091234.jpg',
        after: 'spring_flowers_garden.jpg',
        img: '/images/examples/flowers.jpg',
      },
      {
        before: 'CAM00847.jpg',
        after: 'RedSportsCar.jpg',
        img: '/images/examples/car.jpg',
      },
      {
        before: 'image(47).png',
        after: 'FOREST_MORNING_MIST.png',
        img: '/images/examples/nature.jpg',
      },
      {
        before: 'photo_6282910374.jpg',
        after: 'Glass Skyscraper.jpg',
        img: '/images/examples/building.jpg',
      },
      {
        before: 'Screenshot 2024-11-02.png',
        after: 'team_meeting.png',
        img: '/images/examples/workspace.jpg',
      },
      {
        before: 'DJI_0234.JPG',
        after: 'Mountain_Lake_Aerial.jpg',
        img: '/images/examples/mountain.jpg',
      },
    ],
  },
];

const FileShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      className={styles.FileShowcase}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={styles.FileShowcase__Grid}
        >
          {slides[currentSlide].files.map((file, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{
                duration: 0.4,
                delay: i * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={styles.FileItem}
            >
              <img src={file.img} alt='' className={styles.FileItem__Image} />
              <div className={styles.FileItem__Content}>
                <div className={styles.FileItem__Before}>{file.before}</div>
                <div className={styles.FileItem__After}>{file.after}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FileShowcase;

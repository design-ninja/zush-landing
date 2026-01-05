import { useState, useRef, useEffect } from 'react';
import styles from './FeatureSlider.module.scss';

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  image: string;
  darkImage: string;
}

const features: FeatureItem[] = [
  {
    id: 'welcome',
    title: 'Easy Setup',
    description: 'Select your watch folder and grant permissions in one simple step. Zush guides you through the setup process.',
    image: '/images/features/welcome.png',
    darkImage: '/images/features/dark/welcome.png'
  },
  {
    id: 'general',
    title: 'Status and Settings',
    description: 'Monitor file processing status, see current analysis in real-time, and manage your app settings.',
    image: '/images/features/general.png',
    darkImage: '/images/features/dark/general.png'
  },
  {
    id: 'organize',
    title: 'Organize',
    description: 'Add one or multiple folders to watch, enable AI-powered metadata tagging, and customize your file naming format.',
    image: '/images/features/organize.png',
    darkImage: '/images/features/dark/organize.png'
  },
  {
    id: 'status-bar',
    title: 'Menu Bar Access',
    description: 'Zush icon lives in your menu bar, always ready for quick access to controls and monitoring.',
    image: '/images/features/status-bar.png',
    darkImage: '/images/features/dark/status-bar.png'
  }
];

const FeatureSlider = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') || 'light';
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Listen for theme changes on document
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';
          setTheme(newTheme || 'light');
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const handleScroll = () => {
    if (!trackRef.current) return;
    const scrollLeft = trackRef.current.scrollLeft;
    const width = trackRef.current.offsetWidth;
    const index = Math.round(scrollLeft / width);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const scrollTo = (index: number) => {
    if (!trackRef.current) return;
    const totalSlides = features.length;
    let targetIndex = index;
    
    // Handle infinite loop
    if (index < 0) {
      targetIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      targetIndex = 0;
    }
    
    const width = trackRef.current.offsetWidth;
    trackRef.current.scrollTo({
      left: width * targetIndex,
      behavior: 'smooth'
    });
    setActiveIndex(targetIndex);
  };

  return (
    <section className={styles.FeatureSlider}>
      <div className={styles.FeatureSlider__Container}>
        <div className={styles.FeatureSlider__Header}>
          <h2 className={styles.FeatureSlider__Title}>
            Zush <span className={styles.FeatureSlider__TitleAccent}>Features</span>
          </h2>
          <p className={styles.FeatureSlider__Subtitle}>
            Explore the powerful features that make Zush your ultimate screenshot organization tool
          </p>
        </div>

        <div 
          className={styles.FeatureSlider__Track} 
          ref={trackRef}
          onScroll={handleScroll}
        >
          {features.map((feature) => (
            <div key={feature.id} className={`${styles.FeatureItem} ${feature.id === 'status-bar' ? styles.FeatureItem_small : ''}`}>
              <div className={styles.FeatureItem__ImageContainer}>
                <img
                  src={theme === 'dark' ? feature.darkImage : feature.image}
                  alt={feature.title}
                  className={styles.FeatureItem__Image}
                />
              </div>
              <div className={styles.FeatureItem__Content}>
                <h3 className={styles.FeatureItem__Title}>{feature.title}</h3>
                <p className={styles.FeatureItem__Description}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.FeatureSlider__Dots}>
          {features.map((_, index) => (
            <button
              key={index}
              className={`${styles.FeatureSlider__Dot} ${activeIndex === index ? styles.FeatureSlider__Dot_active : ''}`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSlider;

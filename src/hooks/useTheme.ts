import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';
const THEME_STORAGE_KEY = 'zush-theme';

interface UseThemeReturn {
  theme: Theme;
  toggleTheme: () => void;
}

const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === 'dark' || storedTheme === 'light') {
      return storedTheme;
    }
  } catch {}

  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'dark' || currentTheme === 'light') {
    return currentTheme;
  }

  return getSystemTheme();
};

export const useTheme = (): UseThemeReturn => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      try {
        const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme === 'dark' || storedTheme === 'light') {
          return;
        }
      } catch {}

      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === 'light' ? 'dark' : 'light';

      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch {}

      return nextTheme;
    });
  };

  return { theme, toggleTheme };
};

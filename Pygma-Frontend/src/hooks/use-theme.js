import { useEffect, useState } from 'react';

export const useThemeDetector = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const getCurrentTheme = () => {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return isDarkMode ? 'dark' : 'light';
    };

    const handleThemeChange = () => {
      setIsDarkTheme(getCurrentTheme());
    };

    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    darkThemeMq.addEventListener('change', handleThemeChange);
    setIsDarkTheme(getCurrentTheme());

    return () => {
      darkThemeMq.removeEventListener('change', handleThemeChange);
    };
  }, []);

  return isDarkTheme;
};

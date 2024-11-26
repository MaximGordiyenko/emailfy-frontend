import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  // Initialize theme from sessionStorage or default to 'light'
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      return sessionStorage.getItem('theme') === 'dark'; // Check stored theme
    }
    return false; // Default to light theme
  });

  // Toggle theme and save to sessionStorage
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    sessionStorage.setItem('theme', newTheme ? 'dark' : 'light'); // Persist theme
  };

  useEffect(() => {
    // Sync theme with sessionStorage on mount (in case user manually changes it)
    const storedTheme = sessionStorage.getItem('theme');
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [theme, setThemex] = useState(null);

  const setTheme = (value) => {
    localStorage.setItem('theme', JSON.stringify(value));
    const link = document.getElementById('theme-style')
    link.href = link.href.replace(theme.color, value.color)

    setThemex(value);
  };

  useEffect(() => {
    if (theme === null) {
      let themeLS = localStorage.getItem('theme');
      if (themeLS === null) {
        themeLS = JSON.stringify({
          color: 'aqua',
        });
      }
      const link = document.getElementById('theme-style')
      link.href = link.href.replace('aqua', JSON.parse(themeLS).color)
      setThemex(JSON.parse(themeLS));
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  )
};

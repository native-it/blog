// import { createContext, useContext, useEffect } from 'react'
// import { useMedia } from 'react-use'
// import { useConfig } from '@/lib/config'

// const ThemeContext = createContext({ dark: true })

// export function ThemeProvider ({ children }) {
//   const { appearance } = useConfig()

//   // `defaultState` should normally be a boolean. But it causes initial loading flashes in slow
//   // rendering. Setting it to `null` so that we can differentiate the initial loading phase
//   const prefersDark = useMedia('(prefers-color-scheme: dark)', null)
//   const dark = appearance === 'dark' || (appearance === 'auto' && prefersDark)
// console.log(dark)
// console.log(prefersDark)
//   useEffect(() => {
//     // Only decide color scheme after initial loading, i.e. when `dark` is really representing a
//     // media query result
//     if (typeof dark === 'boolean') {
//       document.documentElement.classList.toggle('dark', dark)
//       document.documentElement.classList.remove('color-scheme-unset')
//     }
//   }, [dark])

//   return (
//     <ThemeContext.Provider value={{ dark }}>
//       {children}
//     </ThemeContext.Provider>
//   )
// }

// export default function useTheme () {
//   return useContext(ThemeContext)
// }
import { createContext, useContext, useEffect, useState } from "react";

export const themeModelSKey = "theme_mode_value";

const getThemeModeFromLocalStorage = (lsKey) => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(lsKey);
    if (/true/.test(data) || data===null) {
      return true;
    } else {
      return false;
    }
  }
  else {
    return false
  }
};

const ThemeContext = createContext({
  dark: true,
  updateMode: (_mode) => {},
  updateClassList: (_mode) => {},
});

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(
    getThemeModeFromLocalStorage(themeModelSKey)
  );
  const updateMode = (_mode) => {
    setDark(_mode)
    localStorage.setItem(themeModelSKey, _mode)
  };
  const updateClassList = (_mode) => { 
    if (typeof dark === "boolean") {
      document.documentElement.classList.toggle("dark", dark);
      document.documentElement.classList.remove("color-scheme-unset");
    }
  };

  useEffect(() => {
    updateClassList(dark);
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, updateMode,updateClassList }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default function useTheme() {
  return useContext(ThemeContext);
}

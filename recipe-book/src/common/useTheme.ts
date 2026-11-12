import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

// Must match the key read by the inline script in public/index.html.
const STORAGE_KEY = "theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

function readSavedTheme(): Theme | null {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    return null;
  }
}

function readSystemTheme(): Theme {
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

/**
 * Pico follows the OS light/dark setting until <html data-theme> is set.
 * Toggling sets that attribute and remembers the choice in localStorage.
 */
function useTheme(): [Theme, () => void] {
  const [savedTheme, setSavedTheme] = useState<Theme | null>(readSavedTheme);
  const [systemTheme, setSystemTheme] = useState<Theme>(readSystemTheme);

  useEffect(() => {
    const query = window.matchMedia(DARK_QUERY);
    const onChange = () => setSystemTheme(query.matches ? "dark" : "light");
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const theme = savedTheme ?? systemTheme;

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage unavailable (e.g. private mode): the choice lasts for this page
    }
    setSavedTheme(next);
  };

  return [theme, toggleTheme];
}

export default useTheme;

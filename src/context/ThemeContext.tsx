"use client";

import React, { createContext, useContext, useEffect, useLayoutEffect, useState, useSyncExternalStore } from "react";

export type Theme = "emerald" | "yellow";

interface ThemeContextType {
  activeTheme: Theme;
  persistentTheme: Theme;
  isHoverPreview: boolean;
  toggleTheme: () => void;
  setPersistentTheme: (theme: Theme) => void;
  startHoverPreview: () => void;
  endHoverPreview: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): Theme {
  try {
    const saved = localStorage.getItem("emerald_portfolio_theme");
    return saved === "yellow" ? "yellow" : "emerald";
  } catch {
    return "emerald";
  }
}

function getServerSnapshot(): Theme {
  return "emerald";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const persistentTheme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);

  const activeTheme: Theme = previewTheme ?? persistentTheme;
  const isHoverPreview = previewTheme !== null && previewTheme !== persistentTheme;

  // Synchronize data-theme attribute on <html> element
  useEffect(() => {
    if (activeTheme === "yellow") {
      document.documentElement.setAttribute("data-theme", "yellow");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [activeTheme]);

  // React's Strict Mode dev remount resets <html> attributes after the inline
  // theme script in layout.tsx has run. Re-apply the persisted theme on mount so
  // development matches production. This is a no-op in production builds.
  useLayoutEffect(() => {
    if (persistentTheme === "yellow") {
      document.documentElement.setAttribute("data-theme", "yellow");
    }
    // Only the initial mount needs to repair the attribute.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = persistentTheme === "emerald" ? "yellow" : "emerald";
    try {
      localStorage.setItem("emerald_portfolio_theme", nextTheme);
      window.dispatchEvent(new Event("storage"));
    } catch {
      // Ignore localStorage access errors
    }
    setPreviewTheme(null);
  };

  const setPersistentTheme = (theme: Theme) => {
    try {
      localStorage.setItem("emerald_portfolio_theme", theme);
      window.dispatchEvent(new Event("storage"));
    } catch {
      // Ignore localStorage access errors
    }
    setPreviewTheme(null);
  };

  const startHoverPreview = () => {
    if (persistentTheme === "emerald") {
      setPreviewTheme("yellow");
    }
  };

  const endHoverPreview = () => {
    setPreviewTheme(null);
  };

  return (
    <ThemeContext.Provider
      value={{
        activeTheme,
        persistentTheme,
        isHoverPreview,
        toggleTheme,
        setPersistentTheme,
        startHoverPreview,
        endHoverPreview,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

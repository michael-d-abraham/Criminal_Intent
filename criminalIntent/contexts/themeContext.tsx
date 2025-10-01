import React, { createContext, useContext, useMemo } from "react";

const DEFAULT_THEME = "#6d28d9";

type ThemeContextValue = {
  contextTheme: string;
};

const ThemeContext = createContext<ThemeContextValue>({
  contextTheme: DEFAULT_THEME,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo(() => ({ contextTheme: DEFAULT_THEME }), []);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

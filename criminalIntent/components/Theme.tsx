import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { TextStyle, ViewStyle } from "react-native";

type Theme = {
  name: string;
  bg: string;
  text: string;
  card: string;
  tint: string;
  buttonBg: string;
  inputBg: string;
};

export const THEMES: Record<string, Theme> = {
  oceanBreeze: {
    name: "Ocean Breeze",
    bg: "#E3F2FD",
    text: "#000000",
    card: "#FFFFFF",
    tint: "#0277BD",
    buttonBg: "#BBDEFB",
    inputBg: "#E1F5FE",
  },
  morningForest: {
    name: "Morning Forest",
    bg: "#E8F5E8",
    text: "#000000",
    card: "#FFFFFF",
    tint: "#388E3C",
    buttonBg: "#C8E6C9",
    inputBg: "#E8F5E8",
  },
  sandstoneDunes: {
    name: "Sandstone Dunes",
    bg: "#FFF3E0",
    text: "#000000",
    card: "#FFFFFF",
    tint: "#FF6F00",
    buttonBg: "#FFE0B2",
    inputBg: "#FFF8E1",
  },
  deepSpace: {
    name: "Deep Space",
    bg: "#0A0A0A",
    text: "#FFFFFF",
    card: "#1A1A1A",
    tint: "#6A5ACD",
    buttonBg: "#2A2A2A",
    inputBg: "#1E1E1E",
  },
  midnightForest: {
    name: "Midnight Forest",
    bg: "#0D1B0D",
    text: "#FFFFFF",
    card: "#1A2A1A",
    tint: "#4CAF50",
    buttonBg: "#2A3A2A",
    inputBg: "#1E2E1E",
  },
  volcanicEmber: {
    name: "Volcanic Ember",
    bg: "#1A0A0A",
    text: "#FFFFFF",
    card: "#2A1A1A",
    tint: "#FF5722",
    buttonBg: "#3A2A2A",
    inputBg: "#2E1E1E",
  },
};

type ThemeCtx = {
  theme: Theme;
  setThemeName: (name: keyof typeof THEMES) => void;
};
const ThemeContext = createContext<ThemeCtx | null>(null);
const THEME_KEY = "theme_name_v1";
const DEFAULT_NAME: keyof typeof THEMES = "oceanBreeze";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState<keyof typeof THEMES>(DEFAULT_NAME);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(THEME_KEY);
      if (stored && THEMES[stored]) setName(stored as keyof typeof THEMES);
      setReady(true);
    })();
  }, []);

  const setThemeName = async (n: keyof typeof THEMES) => {
    setName(n);
    await AsyncStorage.setItem(THEME_KEY, n);
  };

  const value = useMemo(() => ({ theme: THEMES[name], setThemeName }), [name]);

  if (!ready) return null;
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}

export const stylesFromTheme = (t: Theme) => ({
  screen: { flex: 1, backgroundColor: t.bg } as ViewStyle,
  card: { backgroundColor: t.card, borderRadius: 12, padding: 12 } as ViewStyle,
  text: { color: t.text } as TextStyle,
  input: {
    backgroundColor: t.inputBg,
    color: t.text,
    padding: 10,
    borderRadius: 8,
  } as TextStyle,
  button: {
    backgroundColor: t.buttonBg,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  } as ViewStyle,
  buttonText: { color: t.text, fontWeight: "600" } as TextStyle,
});

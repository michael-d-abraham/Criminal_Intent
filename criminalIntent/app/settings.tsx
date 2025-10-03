import { Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { stylesFromTheme, THEMES, useTheme } from "../components/Theme";
import ThemeButton from "../components/theme_buttons";

export default function SettingsScreen() {
  const { theme, setThemeName } = useTheme();
  const S = stylesFromTheme(theme);

  return (
    <SafeAreaView style={[S.screen, { padding: 12 }]}>
      <Stack.Screen options={{ headerShown: true }} />

      <View style={{gap: 15, flex: 1, justifyContent: 'center' }}>
      <Text
        style={[S.text, { fontSize: 25, fontWeight: "800", marginBottom: 12, textAlign: "center" }]}
      >
        Pick A Theme
      </Text>

        {Object.entries(THEMES).map(([key, t]) => (
          <ThemeButton
            key={key}
            isSelected={theme.name === t.name}
            onPress={() => setThemeName(key as keyof typeof THEMES)}
          >
            {t.name}
          </ThemeButton>
        ))}
      </View>
    </SafeAreaView>
  );
}

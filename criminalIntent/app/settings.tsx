import { Ionicons } from "@expo/vector-icons";
import { Stack, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { stylesFromTheme, THEMES, useTheme } from "../components/Theme";
import ThemeButton from "../components/theme_buttons";

export default function SettingsScreen() {
  const nav = useNavigation();
  const { theme, setThemeName } = useTheme();
  const S = stylesFromTheme(theme);

  useLayoutEffect(() => {
    nav.setOptions({
      title: "Settings",
      headerRight: undefined,
      headerBackVisible: false,
      headerLeft: () => (
        <Pressable
          onPress={() => nav.goBack()}
          hitSlop={8}
          style={{ paddingHorizontal: 8 }}
        >
          <Ionicons name="chevron-back" size={24} color={theme.tint} />
        </Pressable>
      ),
    });
  }, [nav, theme.tint]);

  return (
    <SafeAreaView style={[S.screen, { padding: 12 }]}>
      <Stack.Screen options={{ headerShown: true }} />

      <Text
        style={[S.text, { fontSize: 25, fontWeight: "800", marginBottom: 12, textAlign: "center" }]}
      >
        Pick A Theme
      </Text>

      <View style={{gap: 15, flex: 1, justifyContent: 'center' }}>
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

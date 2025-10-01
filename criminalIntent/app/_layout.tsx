import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter, useSegments } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import { ThemeProvider, useTheme } from "../components/Theme";
import { uuid } from "../lib/storage";

function LayoutInner() {
  const { theme } = useTheme();
  const router = useRouter();
  const segments = useSegments();

  // Determine which screen we're on
  const isSettingsScreen = segments.includes("settings" as never);
  const isCrimeDetailScreen = segments.includes("crime" as never) && segments.length > 1;

  const getHeaderRight = () => {
    if (isSettingsScreen) {
      return undefined; 
    }
    
    if (isCrimeDetailScreen) {
      // Only settings icon for crime detail
      return (
        <Pressable onPress={() => router.push("/settings")} style={{ marginRight: 8 }}>
          <Ionicons name="settings-outline" size={24} color={theme.tint} />
        </Pressable>
      );
    }
    
    // Main screen - both + and settings icons
    return (
      <View style={{ flexDirection: "row", gap: 16, marginRight: 8 }}>
        <Pressable
          onPress={() => {
            const id = uuid();
            router.push({ pathname: "/crime/[id]", params: { id } });
          }}
        >
          <Ionicons name="add" size={26} color={theme.tint} />
        </Pressable>
        <Pressable onPress={() => router.push("/settings")}>
          <Ionicons name="settings-outline" size={24} color={theme.tint} />
        </Pressable>
      </View>
    );
  };

  const getHeaderLeft = () => {
    if (isSettingsScreen || isCrimeDetailScreen) {
      return (
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          style={{ paddingHorizontal: 8 }}
        >
          <Ionicons name="chevron-back" size={24} color={theme.tint} />
        </Pressable>
      );
    }
    return undefined;
  };

  const getTitle = () => {
    if (isSettingsScreen) return "Settings";
    if (isCrimeDetailScreen) return "Criminal Intent";
    return "Criminal Intent";
  };

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.card },
        headerTitleStyle: { color: theme.text },
        headerTintColor: theme.tint,
        headerRight: getHeaderRight,
        headerLeft: getHeaderLeft,
        title: getTitle(),
      }}
    />
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LayoutInner />
    </ThemeProvider>
  );
}

import { useFocusEffect } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CrimeItem } from "../components/CrimeStuff";
import { stylesFromTheme, useTheme } from "../components/Theme";
import { Crime, loadCrimes } from "../lib/storage";

export default function IndexScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const S = stylesFromTheme(theme);

  const [crimes, setCrimes] = useState<Crime[]>([]);

  const refresh = useCallback(() => {
    loadCrimes().then(setCrimes);
  }, []);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );


  const renderItem = ({ item }: { item: Crime }) => (
    <CrimeItem
      crime={item}
      onPress={() =>
        router.push({ pathname: "/crime/[id]", params: { id: item.id } })
      }
    />
  );

  return (
    <SafeAreaView style={S.screen}>
      <Stack.Screen options={{ headerShown: true }} />
      <FlatList
        data={crimes}
        keyExtractor={(c) => c.id}
        renderItem={renderItem}
        contentContainerStyle={{ backgroundColor: theme.card }}
      />
    </SafeAreaView>
  );
}

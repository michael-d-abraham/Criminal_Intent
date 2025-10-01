import React from "react";
import { Pressable, Text } from "react-native";

import { useTheme } from "@/contexts/themeContext";

export type Crime = {
  id: string;
  title: string;
  details?: string;
  date: string;
  solved: boolean;
};

type CrimeListItemProps = {
  crime: Crime;
  onSelect: (id: string) => void;
};

export default function CrimeListItem({ crime, onSelect }: CrimeListItemProps) {
  const { contextTheme } = useTheme();
  const formattedDate = new Date(crime.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Pressable
      onPress={() => onSelect(crime.id)}
      style={{ backgroundColor: contextTheme, padding: 12, borderRadius: 8 }}
    >
      <Text style={{ color: "#ffffff", fontWeight: "700", fontSize: 16 }}>
        {crime.title}
      </Text>
      <Text style={{ color: "#ffffff" }}>{formattedDate}</Text>
      {crime.details ? (
        <Text style={{ color: "#f3f4f6" }} numberOfLines={1}>
          {crime.details}
        </Text>
      ) : null}
      <Text style={{ color: "#d1d5db", marginTop: 4 }}>
        {crime.solved ? "Solved" : "Open"}
      </Text>
    </Pressable>
  );
}

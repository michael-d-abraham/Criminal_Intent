import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const FALLBACK_CRIME = {
  title: "New Case",
  details: "Start documenting what happened.",
};

export default function CrimePage() {
  const params = useLocalSearchParams();
  const crimeId = typeof params.crimeId === "string" ? params.crimeId : "";

  const crime = DEFAULT_CRIMES.find((item) => item.id === crimeId);
  const data = crime ?? FALLBACK_CRIME;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.details}>{data.details}</Text>
    </View>
  );
}

const DEFAULT_CRIMES = [
  {
    id: "case-004",
    title: "Warehouse Recon",
    details: "Briefed patrol on warehouse recon plan.",
  },
  {
    id: "case-002",
    title: "Old Town Follow-up",
    details: "Surveillance follow-up in Old Town district.",
  },
  {
    id: "case-001",
    title: "Initial Intake",
    details: "Case details to be filled in soon.",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111827",
  },
  details: {
    fontSize: 16,
    color: "#374151",
  },
});


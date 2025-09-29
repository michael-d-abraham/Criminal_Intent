import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function CrimePage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Crime Overview</Text>
      <Text style={styles.description}>
        This page will summarize recent criminal activity, persons of interest,
        and investigative timelines. Use cards, charts, or lists to surface the
        most relevant information first.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Next Steps</Text>
        <Text style={styles.body}>
          • Highlight the top investigations that need attention.
          {"\n"}• Show suspect profiles with risk levels.
          {"\n"}• Surface evidence logs and pending tasks.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 24,
    backgroundColor: "#f3f4f6",
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },
  description: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 22,
  },
  section: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#111827",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#1f2937",
  },
  body: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
  },
});
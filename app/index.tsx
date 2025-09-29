import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Criminal Intent</Text>
        <Text style={styles.subtitle}>Choose where to start</Text>
      </View>

      <View style={styles.links}>
        <Link href="/crimePage" asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardTitle}>Crime Overview</Text>
            <Text style={styles.cardBody}>
              Review recent cases, suspects, and investigative notes.
            </Text>
          </Pressable>
        </Link>

        <Link href="/settings" asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardTitle}>Settings</Text>
            <Text style={styles.cardBody}>
              Configure notifications, data sync, and personalization.
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: "#f8f9fb",
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
    color: "#111827",
  },
  subtitle: {
    fontSize: 16,
    color: "#4b5563",
  },
  links: {
    gap: 16,
  },
  card: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#111827",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  cardBody: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
  },
});

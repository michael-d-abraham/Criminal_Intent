import { StyleSheet, Text, View } from "react-native";

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <Text style={styles.body}>
        Configure preferences for notifications, data retention, and security.
        Add toggles, dropdowns, or segmented controls to let investigators
        tailor their experience.
      </Text>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Controls coming soon…</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f9fafb",
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
  },
  body: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 22,
    marginBottom: 24,
  },
  placeholder: {
    height: 160,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#d1d5db",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  placeholderText: {
    fontSize: 14,
    color: "#6b7280",
  },
});


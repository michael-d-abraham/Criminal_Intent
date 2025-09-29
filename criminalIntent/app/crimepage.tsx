import { StyleSheet, Text, View } from "react-native";

export default function CrimePage() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Crime Page</Text>
        <Text style={styles.subtitle}>
          This is a placeholder for crime-related content. Build it out as the
          app evolves.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
});


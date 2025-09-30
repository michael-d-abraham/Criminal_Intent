import { Link, Stack } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#6d28d9" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "700" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Criminal Intent",
          headerRight: () => (
            <Link
              href={{ pathname: "/crimepage", params: { crimeId: "new" } }}
              asChild
            >
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Add crime"
                style={styles.headerButton}
              >
                <Text style={styles.headerButtonText}>+</Text>
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="crimepage"
        options={{
          title: "Crime Details",
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#5b21b6",
    alignItems: "center",
    justifyContent: "center",
  },
  headerButtonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
    marginTop: -2,
  },
});


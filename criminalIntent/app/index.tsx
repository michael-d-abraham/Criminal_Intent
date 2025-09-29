import { Stack, useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type CrimeItem = {
  id: string;
  title: string;
  details?: string;
  occurredOn: string;
  solved: boolean;
};

const CRIMES: CrimeItem[] = [
  {
    id: "ca-004",
    title: "Criminal Activity 4",
    occurredOn: "2025-01-30T13:13:43.639Z",
    solved: false,
  },
  {
    id: "ca-002",
    title: "Criminal Activity 2",
    occurredOn: "2025-01-24T21:44:40.415Z",
    solved: true,
    details: "Surveillance follow-up in Old Town district.",
  },
  {
    id: "ca-001",
    title: "Criminal Activity 1",
    occurredOn: "2025-01-03T02:14:54.649Z",
    solved: false,
  },
  {
    id: "test-001",
    title: "Testing",
    occurredOn: "2025-02-18T22:05:05.951Z",
    solved: true,
    details: "Internal QA scenario.",
  },
  {
    id: "ca-003",
    title: "Criminal Activity 3",
    occurredOn: "2024-11-09T13:52:11.246Z",
    solved: true,
  },
  {
    id: "new-002",
    title: "New 2~!",
    occurredOn: "2025-02-18T21:59:04.778Z",
    solved: false,
    details: "Witness statements pending transcription.",
  },
  {
    id: "new-001",
    title: "New!",
    occurredOn: "2025-02-18T21:58:44.900Z",
    solved: false,
  },
  {
    id: "ca-005",
    title: "Criminal Activity 5",
    occurredOn: "2025-01-11T16:59:08.202Z",
    solved: false,
  },
  {
    id: "misc-001",
    title: "asdfasdfasdf",
    occurredOn: "2025-02-18T22:06:50.903Z",
    solved: true,
  },
];

export default function Index() {
  const router = useRouter();

  const handleSelectCrime = (crimeId: string) => {
    router.push({ pathname: "/crimepage", params: { crimeId } });
  };

  const handleCreateCrime = () => {
    router.push({ pathname: "/crimepage", params: { crimeId: "new" } });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Criminal Intent",
          headerStyle: { backgroundColor: "#6d28d9" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "700" },
          headerRight: () => (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Add crime"
              style={styles.headerButton}
              onPress={handleCreateCrime}
            >
              <Text style={styles.headerButtonText}>+</Text>
            </Pressable>
          ),
        }}
      />

      <FlatList
        data={CRIMES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable
            style={styles.listItem}
            onPress={() => handleSelectCrime(item.id)}
          >
            <View style={styles.listItemText}>
              <Text style={styles.listItemTitle}>{item.title}</Text>
              <Text style={styles.listItemDate}>{item.occurredOn}</Text>
              {item.details ? (
                <Text style={styles.listItemDetails}>{item.details}</Text>
              ) : null}
            </View>

            {item.solved ? (
              <MaterialCommunityIcons
                name="handcuffs"
                size={24}
                color="#111827"
              />
            ) : null}
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
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
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  listItemText: {
    flex: 1,
    paddingRight: 12,
    gap: 4,
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  listItemDate: {
    fontSize: 14,
    color: "#6b7280",
  },
  listItemDetails: {
    fontSize: 14,
    color: "#374151",
  },
  separator: {
    height: 12,
  },
});

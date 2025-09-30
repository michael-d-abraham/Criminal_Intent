import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

// Will go into the crimpe page later
type Crime = {
  id: string;
  title: string;
  details?: string;
  date: string;
  solved: boolean;
  photoUri?: string | null;
};

const DEFAULT_CRIMES: Crime[] = [
  {
    id: "ca-004",
    title: "Criminal Activity 4",
    details: "Briefed patrol on warehouse recon plan.",
    date: "2025-01-30T13:13:43.639Z",
    solved: false,
    photoUri: null,
  },
  {
    id: "ca-002",
    title: "Criminal Activity 2",
    date: "2025-01-24T21:44:40.415Z",
    solved: true,
    details: "Surveillance follow-up in Old Town district.",
    photoUri: null,
  },
  {
    id: "ca-001",
    title: "Criminal Activity 1",
    date: "2025-01-03T02:14:54.649Z",
    solved: false,
    photoUri: null,
  },
  {
    id: "test-001",
    title: "Testing",
    date: "2025-02-18T22:05:05.951Z",
    solved: true,
    details: "Internal QA scenario.",
    photoUri: null,
  },
  {
    id: "ca-003",
    title: "Criminal Activity 3",
    date: "2024-11-09T13:52:11.246Z",
    solved: true,
    photoUri: null,
  },
];

export default function Index() {
  const router = useRouter();
  const crimes = DEFAULT_CRIMES;

  const handleSelectCrime = (crimeId: string) => {
    router.push({ pathname: "/crimepage", params: { crimeId } });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={crimes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No crimes logged yet</Text>
            <Text style={styles.emptyStateBody}>
              Tap the + button to record your first case.
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Pressable
            style={styles.listItem}
            onPress={() => handleSelectCrime(item.id)}
          >
            <View style={styles.listItemText}>
              <Text style={styles.listItemTitle}>{item.title}</Text>
              <Text style={styles.listItemMeta}>{formatDate(item.date)}</Text>
              {item.details ? (
                <Text style={styles.listItemDetails} numberOfLines={1}>
                  {item.details}
                </Text>
              ) : null}
            </View>
            <Text style={styles.listItemStatus}>
              {item.solved ? "Solved" : "Open"}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    borderColor: "#e5e7eb",
    borderWidth: 1,
  },
  listItemText: {
    flex: 1,
    marginRight: 12,
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  listItemMeta: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  listItemDetails: {
    fontSize: 14,
    color: "#374151",
    marginTop: 4,
  },
  listItemStatus: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563eb",
  },
  separator: {
    height: 16,
  },
  emptyState: {
    marginTop: 64,
    alignItems: "center",
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
  },
  emptyStateBody: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
});

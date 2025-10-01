// Crime details page

import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import ExpoCheckbox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
    Alert,
    Image,
    Modal,
    Platform,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { stylesFromTheme, useTheme } from "../../components/Theme";
import { Crime, getCrime, upsertCrime } from "../../lib/storage";

export default function CrimeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const nav = useNavigation();
  const router = useRouter();
  const { theme } = useTheme();
  const S = stylesFromTheme(theme);

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [solved, setSolved] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);

  const [dateOpen, setDateOpen] = useState(false);

  useLayoutEffect(() => {
    nav.setOptions({
      title: "Crime Detail",
      headerBackVisible: false,
      headerLeft: () => (
        <Pressable
          onPress={() => nav.goBack()}
          hitSlop={8}
          style={{ paddingHorizontal: 8 }}
        >
          <Ionicons name="chevron-back" size={24} color={theme.tint} />
        </Pressable>
      ),
      headerRight: () => (
        <Pressable
          onPress={() => router.push("/settings")}
          style={{ marginRight: 8 }}
        >
          <Ionicons name="settings-outline" size={24} color={theme.tint} />
        </Pressable>
      ),
    });
  }, [nav, router, theme.tint]);

  useEffect(() => {
    getCrime(id).then((c) => {
      if (!c) return;
      setTitle(c.title);
      setDetails(c.details);
      setDate(new Date(c.dateISO));
      setSolved(c.solved);
      setPhotoUri(c.photoUri);
    });
  }, [id]);

  const onPickPhoto = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsMultipleSelection: false,
      selectionLimit: 1,
    });
    if (!res.canceled && res.assets?.[0]?.uri) {
      setPhotoUri(res.assets[0].uri);
    }
  };

  const onSave = async () => {
    const payload: Crime = {
      id,
      title: title.trim(),
      details: details.trim(),
      dateISO: date.toISOString(),
      solved,
      photoUri,
    };
    await upsertCrime(payload);
    Alert.alert("Saved", "This crime was uploaded successfully.");
  };

  return (
    <SafeAreaView style={[S.screen, { padding: 16 }]}>
      {/* Image and Title Section */}
      <View style={{ flexDirection: "row", gap: 16, alignItems: "flex-start", marginBottom: 24 }}>
        <View style={{ width: 120, alignItems: "center" }}>
          {photoUri ? (
            <Image
              source={{ uri: photoUri }}
              style={{ 
                width: 120, 
                height: 120, 
                borderRadius: 8,
              }}
            />
          ) : (
            <View
              style={[
                {
                  width: 120,
                  height: 120,
                  backgroundColor: "#f0f0f0",
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: theme.text + "20",
                },
              ]}
            />
          )}
          <View style={{ height: 12 }} />
          <Pressable
            style={[
              {
                backgroundColor: "#f0f0f0",
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: theme.text + "20",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 80,
              }
            ]}
            onPress={onPickPhoto}
            accessibilityLabel="Pick Photo"
          >
            <Ionicons name="camera-outline" size={20} color={theme.tint} />
          </Pressable>
        </View>

        <View style={{ flex: 1, gap: 12 }}>
          <Text style={[S.text, { fontSize: 16, fontWeight: "600" }]}>Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            placeholderTextColor={theme.text + "60"}
            style={[
              S.input, 
              { 
                fontSize: 16,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderBottomWidth: 1,
                borderBottomColor: theme.text + "30",
                backgroundColor: "transparent",
                borderRadius: 0,
              }
            ]}
          />
        </View>
      </View>

      {/* Details Section */}
      <View style={{ marginBottom: 24 }}>
        <Text style={[S.text, { fontSize: 16, fontWeight: "600", marginBottom: 12 }]}>Details</Text>
        <TextInput
          value={details}
          onChangeText={setDetails}
          placeholder="What happened?"
          placeholderTextColor={theme.text + "60"}
          style={[
            S.input, 
            { 
              minHeight: 100, 
              textAlignVertical: "top",
              fontSize: 16,
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderWidth: 1,
              borderColor: theme.text + "20",
            }
          ]}
          multiline
        />
      </View>

      {/* Date Picker - Full Width */}
      <View style={{ marginBottom: 16 }}>
        <Pressable
          style={[
            {
              backgroundColor: theme.tint,
              paddingVertical: 16,
              paddingHorizontal: 20,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
            }
          ]}
          onPress={() => setDateOpen(true)}
        >
          <Text style={[
            S.buttonText, 
            { 
              fontSize: 16, 
              fontWeight: "700",
              color: theme.card,
              textTransform: "uppercase",
              letterSpacing: 0.5
            }
          ]}>
            {date.toDateString().toUpperCase()}
          </Text>
        </Pressable>
      </View>

      {/* Solved Checkbox */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <ExpoCheckbox
          value={solved}
          onValueChange={setSolved}
          color={solved ? theme.tint : undefined}
          style={{ marginRight: 12 }}
        />
        <Text style={[S.text, { fontSize: 16, fontWeight: "500" }]}>Solved</Text>
      </View>

      {/* Save Button - Full Width */}
      <Pressable 
        style={[
          {
            backgroundColor: theme.tint,
            paddingVertical: 16,
            paddingHorizontal: 20,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
          }
        ]} 
        onPress={onSave}
      >
        <Text style={[
          S.buttonText, 
          { 
            fontSize: 16, 
            fontWeight: "700",
            color: theme.card,
            textTransform: "uppercase",
            letterSpacing: 0.5
          }
        ]}>
          SAVE
        </Text>
      </Pressable>

      <Modal
        visible={dateOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setDateOpen(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000066",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <View
            style={[
              { padding: 16, borderRadius: 12 },
              { backgroundColor: theme.card },
            ]}
          >
            <Text style={[S.text, { fontWeight: "600", marginBottom: 8 }]}>
              Pick Date
            </Text>
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "calendar"}
              onChange={(_, d) => {
                if (d) setDate(d);
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 8,
                gap: 12,
              }}
            >
              <Pressable onPress={() => setDateOpen(false)}>
                <Text style={[S.text, { color: theme.tint }]}>Done</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

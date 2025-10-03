// Crime details page

import ExpoCheckbox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button";
import DatePicker from "../../components/DatePicker";
import LabeledInput from "../../components/LabeledInput";
import PhotoPickerCard from "../../components/PhotoPickerCard";
import TextArea from "../../components/TextArea";
import { stylesFromTheme, useTheme } from "../../components/Theme";
import { Crime, getCrime, upsertCrime } from "../../lib/storage";

export default function CrimeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { theme } = useTheme();
  const S = stylesFromTheme(theme);

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [solved, setSolved] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);


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
        <PhotoPickerCard 
          photoUri={photoUri}
          onPickPhoto={onPickPhoto}
          size={120}
        />

        <LabeledInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
        />
      </View>

      {/* Details Section */}
      <TextArea
        label="Details"
        value={details}
        onChangeText={setDetails}
        placeholder="What happened?"
        minHeight={100}
      />

      {/* Date Picker - Full Width */}
      <DatePicker 
        date={date} 
        onDateChange={setDate} 
      />

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
      <Button onPress={onSave}>
        SAVE
      </Button>

    </SafeAreaView>
  );
}

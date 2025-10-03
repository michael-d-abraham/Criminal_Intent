import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { useTheme } from "./Theme";

interface PhotoPickerCardProps {
  photoUri?: string;
  onPickPhoto: () => void;
  size?: number;
  style?: any;
}

const PhotoPickerCard: React.FC<PhotoPickerCardProps> = ({ 
  photoUri, 
  onPickPhoto, 
  size = 120,
  style 
}) => {
  const { theme } = useTheme();

  return (
    <View style={[{ width: size, alignItems: "center" }, style]}>
      {photoUri ? (
        <Image
          source={{ uri: photoUri }}
          style={{ 
            width: size, 
            height: size, 
            borderRadius: 8,
          }}
        />
      ) : (
        <View
          style={[
            {
              width: size,
              height: size,
              backgroundColor: theme.inputBg,
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
            backgroundColor: theme.inputBg,
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
  );
};

export default PhotoPickerCard;

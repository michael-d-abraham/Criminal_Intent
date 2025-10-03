import React from "react";
import { Text, TextInput, View } from "react-native";
import { stylesFromTheme, useTheme } from "./Theme";

interface TextAreaProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  minHeight?: number;
  style?: any;
  inputStyle?: any;
  labelStyle?: any;
}

const TextArea: React.FC<TextAreaProps> = ({ 
  label,
  value,
  onChangeText,
  placeholder,
  minHeight = 100,
  style,
  inputStyle,
  labelStyle
}) => {
  const { theme } = useTheme();
  const S = stylesFromTheme(theme);

  return (
    <View style={[{ marginBottom: 24 }, style]}>
      <Text style={[
        S.text, 
        { 
          fontSize: 16, 
          fontWeight: "600", 
          marginBottom: 12 
        },
        labelStyle
      ]}>
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.text + "60"}
        style={[
          S.input, 
          { 
            minHeight, 
            textAlignVertical: "top",
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderWidth: 1,
            borderColor: theme.text + "20",
          },
          inputStyle
        ]}
        multiline
      />
    </View>
  );
};

export default TextArea;

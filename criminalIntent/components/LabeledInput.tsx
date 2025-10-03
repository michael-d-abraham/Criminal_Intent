import React from "react";
import { Text, TextInput, View } from "react-native";
import { stylesFromTheme, useTheme } from "./Theme";

interface LabeledInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: any;
  inputStyle?: any;
  labelStyle?: any;
}

const LabeledInput: React.FC<LabeledInputProps> = ({ 
  label,
  value,
  onChangeText,
  placeholder,
  style,
  inputStyle,
  labelStyle
}) => {
  const { theme } = useTheme();
  const S = stylesFromTheme(theme);

  return (
    <View style={[{ flex: 1, gap: 12 }, style]}>
      <Text style={[
        S.text, 
        { 
          fontSize: 16, 
          fontWeight: "600" 
        },
        labelStyle
      ]}>
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.text + "90"}
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
          },
          inputStyle
        ]}
      />
    </View>
  );
};

export default LabeledInput;

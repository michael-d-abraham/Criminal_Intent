import React from "react";
import { Pressable, Text } from "react-native";
import { stylesFromTheme, useTheme } from "./Theme";

interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  style?: any;
  textStyle?: any;
}

const Button: React.FC<ButtonProps> = ({ 
  onPress, 
  children, 
  style,
  textStyle 
}) => {
  const { theme } = useTheme();
  const S = stylesFromTheme(theme);

  const buttonStyle = [
    {
      backgroundColor: theme.tint,
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    style,
  ];

  const textStyleCombined = [
    S.buttonText, 
    { 
      fontSize: 16, 
      fontWeight: "700",
      color: theme.card,
      textTransform: "uppercase",
      letterSpacing: 0.5
    },
    textStyle
  ];

  return (
    <Pressable
      style={buttonStyle}
      onPress={onPress}
    >
      <Text style={textStyleCombined}>{children}</Text>
    </Pressable>
  );
};

export default Button;

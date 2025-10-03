import React from "react";
import { Pressable, PressableProps, Text, TextStyle, ViewStyle } from "react-native";
import { stylesFromTheme, useTheme } from "./Theme";

interface ThemeButtonProps {
    onPress: PressableProps['onPress'];
    style?: ViewStyle;
    textStyle?: TextStyle;
    children: React.ReactNode;
    isSelected?: boolean;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ 
    onPress, 
    style, 
    textStyle, 
    children, 
    isSelected = false 
}) => {
    const { theme } = useTheme();
    const S = stylesFromTheme(theme);
    
    const buttonStyle = [
        S.button,
        {
            backgroundColor: theme.card,
            borderRadius: 16,
            paddingVertical: 16,
            paddingHorizontal: 20,
            marginHorizontal: 20,
            shadowColor: theme.tint,
            shadowOffset: {
                width: 3,
                height: 3,
            },
            shadowOpacity: 0.9,
            shadowRadius: 0,
        },
        isSelected && {
            shadowColor: theme.tint,
            shadowOffset: {
                width: .1,
                height: .1,
            },
            shadowOpacity: 0.7,
            shadowRadius: 0,
        },
        style,
    ];
    
    const textStyleCombined = [
        S.buttonText, 
        {
            fontSize: 16,
            fontWeight: '500' as const,
            textAlign: 'center' as const,
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

export default ThemeButton;
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
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        isSelected && {
            borderWidth: 2,
            borderColor: theme.tint,
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
import {Button, ButtonProps, Pressable, PressableProps} from "react-native";
import {useThemeColor} from "@/hooks/useThemeColor";
import React from "react";

export type ThemedPressableProps = PressableProps & {
    lightColor?: string;
    darkColor?: string;
    children: React.ReactNode;
};

export function ThemedPressable({
                                    lightColor,
                                    darkColor,
                                    children,
                                    ...rest
                                }: ThemedPressableProps) {
    const color = useThemeColor({light: lightColor, dark: darkColor}, 'button');

    return (
        <Pressable {...rest} style={{backgroundColor: color}}
        >
            {children}
        </Pressable>
    );
}

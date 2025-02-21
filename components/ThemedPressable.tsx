import {Pressable, PressableProps, PressableStateCallbackType, ViewStyle} from "react-native";
import {useThemeColor} from "@/hooks/useThemeColor";
import React from "react";

export type ThemedPressableProps = PressableProps & {
    lightColor?: string;
    darkColor?: string;
    style?: ViewStyle | ((state: PressableStateCallbackType) => ViewStyle);
};

export function ThemedPressable({
                                    style,
                                    lightColor,
                                    darkColor,
                                    children,
                                    ...rest
                                }: ThemedPressableProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, "button");

    return (
        <Pressable
            {...rest}
            style={(state) => [
                { backgroundColor: color },
                typeof style === "function" ? style(state) : style
            ]}
        >
            {children}
        </Pressable>
    );
}

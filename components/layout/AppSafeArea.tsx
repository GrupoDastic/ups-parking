import React from "react";
import { View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props extends ViewProps {
    children: React.ReactNode;
    edges?: ("top" | "bottom" | "left" | "right")[];
}

export default function AppSafeArea({ children, style }: Readonly<Props>) {
    return (
        <View style={style}>
            <SafeAreaView style={{ flex: 1 }}>
                {children}
            </SafeAreaView>
        </View>
    );
}

import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BaseToastProps } from "react-native-toast-message";

type ToastVariant = {
    icon: keyof typeof Ionicons.glyphMap;
    bgColor: string;
    iconColor: string;
};

const variants: Record<string, ToastVariant> = {
    success: {
        icon: "checkmark-circle",
        bgColor: "#16a34a",
        iconColor: "#ffffff",
    },
    error: {
        icon: "close-circle",
        bgColor: "#dc2626",
        iconColor: "#ffffff",
    },
    warning: {
        icon: "warning",
        bgColor: "#f59e0b",
        iconColor: "#000000",
    },
    destructive: {
        icon: "trash",
        bgColor: "#991b1b",
        iconColor: "#ffffff",
    },
    info: {
        icon: "information-circle",
        bgColor: "#2563eb",
        iconColor: "#ffffff",
    },
};

type ToastAction = {
    label: string;
    onPress: () => void;
};

function ToastView({
                       text1,
                       text2,
                       variant = "info",
                       props,
                   }: BaseToastProps & {
    variant?: keyof typeof variants;
    props?: {
        action?: ToastAction;
    };
}) {
    const v = variants[variant];
    const action = props?.action;

    return (
        <View
            style={{
                backgroundColor: v.bgColor,
                padding: 16,
                borderRadius: 14,
                flexDirection: "row",
                alignItems: "center",
                minWidth: 300,
                gap: 12,
            }}
        >
            {/* ICON */}
            <Ionicons name={v.icon} size={24} color={v.iconColor} />

            {/* TEXT */}
            <View style={{ flex: 1 }}>
                {text1 && (
                    <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                        {text1}
                    </Text>
                )}

                {text2 && (
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: 13,
                            opacity: 0.9,
                            marginTop: 2,
                        }}
                    >
                        {text2}
                    </Text>
                )}
            </View>

            {/* ACTION */}
            {action && (
                <Pressable
                    onPress={action.onPress}
                    style={({ pressed }) => ({
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 8,
                        backgroundColor: pressed
                            ? "rgba(255,255,255,0.15)"
                            : "rgba(255,255,255,0.25)",
                    })}
                >
                    <Text style={{ color: "#fff", fontWeight: "600", fontSize: 13 }}>
                        {action.label}
                    </Text>
                </Pressable>
            )}
        </View>
    );
}

export const toastConfig = {
    success: (p: BaseToastProps) => <ToastView {...p} variant="success" />,
    error: (p: BaseToastProps) => <ToastView {...p} variant="error" />,
    warning: (p: BaseToastProps) => <ToastView {...p} variant="warning" />,
    destructive: (p: BaseToastProps) => (
        <ToastView {...p} variant="destructive" />
    ),
    info: (p: BaseToastProps) => <ToastView {...p} variant="info" />,
};

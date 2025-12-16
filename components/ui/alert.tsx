import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ThemedText from "@/components/shared/ThemedText";
import { cn } from "@/lib/cn";

type AlertVariant = "info" | "success" | "error" | "warning";

const variantStyles: Record<
    AlertVariant,
    {
        bg: string;
        border: string;
        text: string;
        icon: keyof typeof Ionicons.glyphMap;
        iconColor: string;
    }
> = {
    info: {
        bg: "bg-blue-500/10",
        border: "border-blue-500/40",
        text: "text-blue-700",
        icon: "information-circle",
        iconColor: "#2563eb",
    },
    success: {
        bg: "bg-green-500/10",
        border: "border-green-500/40",
        text: "text-green-700",
        icon: "checkmark-circle",
        iconColor: "#22c55e",
    },
    error: {
        bg: "bg-red-500/10",
        border: "border-red-500/40",
        text: "text-red-700",
        icon: "close-circle",
        iconColor: "#ef4444",
    },
    warning: {
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/40",
        text: "text-yellow-700",
        icon: "warning",
        iconColor: "#eab308",
    },
};

export function AlertBanner({
                                message,
                                variant = "info",
                                dismissible = true,
                            }: {
    message: string;
    variant?: AlertVariant;
    dismissible?: boolean;
}) {
    const [visible, setVisible] = useState(true);
    if (!visible) return null;

    const v = variantStyles[variant];

    return (
        <View
            className={cn(
                "flex-row items-center gap-3 rounded-md border px-4 py-3 my-2",
                v.bg,
                v.border
            )}
        >
            <Ionicons name={v.icon} size={20} color={v.iconColor} />

            <ThemedText className={cn("flex-1", v.text)}>
                {message}
            </ThemedText>

            {dismissible && (
                <Pressable onPress={() => setVisible(false)}>
                    <Ionicons name="close" size={18} color={v.iconColor} />
                </Pressable>
            )}
        </View>
    );
}

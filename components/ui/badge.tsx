import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ThemedText from "@/components/shared/ThemedText";
import { cn } from "@/lib/cn";

type BadgeVariant = "info" | "success" | "error" | "warning";

const badgeStyles: Record<BadgeVariant, string> = {
    info: "bg-blue-500/15 text-blue-700",
    success: "bg-green-500/15 text-green-700",
    error: "bg-red-500/15 text-red-700",
    warning: "bg-yellow-500/15 text-yellow-700",
};

export function Badge({
                          label,
                          variant = "info",
                          icon,
                      }: {
    label: string;
    variant?: BadgeVariant;
    icon?: keyof typeof Ionicons.glyphMap;
}) {
    return (
        <View
            className={cn(
                "flex-row items-center gap-1.5 px-2.5 py-1 rounded-full",
                badgeStyles[variant]
            )}
        >
            {icon && <Ionicons name={icon} size={12} />}
            <ThemedText className="text-xs font-semibold">
                {label}
            </ThemedText>
        </View>
    );
}

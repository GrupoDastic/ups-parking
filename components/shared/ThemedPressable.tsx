import { Pressable, PressableProps, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ThemedText from "@/components/shared/ThemedText";

export interface ThemedPressableProps extends PressableProps {
    title: string;
    className?: string;
    icon?: keyof typeof Ionicons.glyphMap;
    size?: number;
    isActive?: boolean;
}

const ThemedPressable = ({
                             title,
                             className = "",
                             icon,
                             size = 20,
                             isActive = false,
                             ...rest
                         }: ThemedPressableProps) => {
    return (
        <Pressable
            className={`
        px-4 py-2.5 rounded-lg
        flex-row items-center justify-center gap-2
        bg-secondary
        active:opacity-80
        ${isActive ? "bg-secondary/20" : ""}
        ${className}
      `}
            {...rest}
        >
            {icon && (
                <Ionicons
                    name={icon}
                    size={size}
                    color="#FFFFFF"
                />
            )}

            <ThemedText
                type="button"
            >
                {title}
            </ThemedText>
        </Pressable>
    );
};

export default ThemedPressable;

import React from "react";
import { ActivityIndicator, View } from "react-native";
import ThemedText from "@/components/shared/ThemedText";
import ThemedPressable from "@/components/shared/ThemedPressable";
import { useThemeColor } from "@/hooks/useThemeColor";

export interface SpinnerProps {
    /** Optional descriptive text (Spanish by default). */
    text?: string;
    /** Show retry button – requires onRetry handler. */
    showRetry?: boolean;
    /** Callback executed when user taps “Reintentar”. */
    onRetry?: () => void;
    /** Extra Tailwind classes for the wrapper. */
    className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
                                             text = "Cargando…",
                                             showRetry = false,
                                             onRetry,
                                             className,
                                         }) => {
    const primary = useThemeColor({}, "primary");

    return (
        <View className={`items-center justify-center ${className ?? ""}`}>
            <ActivityIndicator size="large" color={primary} />
            {text && (
                <ThemedText className="mt-2 color-light-text-primary dark:color-dark-text-primary">
                    {text}
                </ThemedText>
            )}

            {showRetry && onRetry && (
                <ThemedPressable
                    className="mt-2"
                    icon="refresh"
                    title="Reintentar"
                    onPress={onRetry}
                />
            )}
        </View>
    );
};

export default React.memo(Spinner);

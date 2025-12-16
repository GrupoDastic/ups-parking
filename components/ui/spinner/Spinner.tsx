import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";

import ThemedText from "@/components/shared/ThemedText";
import ThemedPressable from "@/components/shared/ThemedPressable";

export interface SpinnerProps {
    text?: string;
    showRetry?: boolean;
    onRetry?: () => void;
    className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
                                             text = "Cargando…",
                                             showRetry = false,
                                             onRetry,
                                             className,
                                         }) => {
    const theme = useAppTheme();

    return (
        <View className={`items-center justify-center ${className ?? ""}`}>
            <ActivityIndicator size="large" color={theme.primary} />

            {text && (
                <ThemedText className="mt-2">
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

import {TouchableOpacity, View} from "react-native";
import React from "react";
import ThemedText from "./shared/ThemedText";

interface ErrorPageProps {
    message?: string;
    onRetry?: () => void;
}

const ErrorPage = ({
                                                 message = "¡Ups! Algo salió mal.",
                                                 onRetry
                                             } : ErrorPageProps) => {
    return (
        <View className="flex-1 justify-center items-center bg-background p-6">
            <ThemedText type="h1" className="text-error mb-2">
                Error
            </ThemedText>
            <ThemedText type="body1" className="text-onBackground text-center">
                {message}
            </ThemedText>

            {onRetry && (
                <TouchableOpacity
                    className="mt-6 bg-error px-6 py-2 rounded-lg"
                    onPress={onRetry}
                >
                    <ThemedText type="button" className="text-onError">
                        Reintentar
                    </ThemedText>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default ErrorPage;

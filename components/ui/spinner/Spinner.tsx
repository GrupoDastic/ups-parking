import {ActivityIndicator, View} from "react-native";
import {FC} from "react";
import ThemedText from "@/components/shared/ThemedText";
import ThemedPressable from "@/components/shared/ThemedPressable";

interface SpinnerProps {
    size?: "small" | "large";
    color?: string;
    text?: string;
    className?: string;
    retry?: () => void;
}

const Spinner: FC<SpinnerProps> = ({ size = "large", color = "#3b82f6", text, retry, className }) => {
    return (
        <View className={`items-center justify-center ${className}`}>
            <ActivityIndicator size={size} color={color} />
            {text && <ThemedText className="mt-2 text-gray-600">{text}</ThemedText>}
            {
                retry && (
                    <ThemedPressable title={"Reintentar"} onPress={retry}></ThemedPressable>
                )
            }
        </View>
    );
};

export default Spinner;

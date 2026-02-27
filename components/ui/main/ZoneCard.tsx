import React, {forwardRef} from "react";
import {StyleProp, View, ViewStyle} from "react-native";
import {Feather} from "@expo/vector-icons";
import ThemedText from "@/components/shared/ThemedText";
import {useAppTheme} from "@/hooks/useAppTheme";

export interface ZoneCardProps {
    zoneIdentifier: string;
    zoneName: string;
    availableSpaces: string;
    totalSpaces: string;
    style?: StyleProp<ViewStyle>;
}

const ZoneCard = forwardRef<View, ZoneCardProps>(
    ({zoneIdentifier, zoneName, availableSpaces, totalSpaces, style}, ref) => {
        const spacesCount = Number.parseInt(availableSpaces);
        const isFull = spacesCount === 0;
        const theme = useAppTheme();

        const totalCount = Number.parseInt(totalSpaces);

        const percentage = totalCount > 0
            ? (spacesCount / totalCount) * 100
            : 0;


        return (
            <View
                ref={ref}
                style={[{
                    shadowColor: "#000",
                    shadowOffset: {width: 0, height: 10},
                    shadowRadius: 20,
                    elevation: 8,
                    marginBottom: 16,
                }, style]}
            >
                <View className="rounded-3xl overflow-hidden bg-surface border border-primary/10">
                    <View className="p-6">
                        <View className="flex-row justify-between items-start mb-6">
                            <View>
                                <ThemedText
                                    className="text-muted font-gill-medium uppercase tracking-[2px] mb-1"
                                >
                                    Bloque {zoneIdentifier}
                                </ThemedText>
                                <ThemedText className="text-primary text-2xl font-gill-bold">
                                    {zoneName}
                                </ThemedText>
                            </View>

                            <View
                                className={`
    w-10 h-10 rounded-2xl items-center justify-center
    ${isFull ? "bg-error/15" : "bg-success/50"}
  `}
                            >
                                <Feather
                                    name={isFull ? "lock" : "unlock"}
                                    size={20}
                                    color={isFull ? theme.error : theme.success}
                                />
                            </View>
                        </View>

                        {/* INFO SECTION: Espacios */}
                        <View className="flex-row items-end justify-between">
                            <View>
                                <View className="flex-row items-baseline">
                                    <ThemedText
                                        className={`text-4xl font-gill-bold ${
                                            isFull ? "text-error" : "text-foreground"
                                        }`}
                                    >
                                        {availableSpaces}
                                    </ThemedText>
                                    <ThemedText className="text-muted font-gill-regular ml-2 text-base">
                                        espacios
                                    </ThemedText>
                                </View>
                                <ThemedText
                                    className={`text-sm font-gill-medium ${
                                        isFull ? "text-error" : "text-success"
                                    }`}
                                >
                                    {isFull ? "Zona saturada" : "Disponibilidad inmediata"}
                                </ThemedText>
                            </View>

                            {/* Botón de acción minimalista */}
                            <View className="bg-secondary px-4 py-2.5 rounded-full flex-row items-center">
                                <ThemedText className="text-xs font-gill-bold mr-2 text-white">
                                    VER
                                </ThemedText>
                                <Feather name="arrow-right" size={14} color="white"/>
                            </View>
                        </View>
                    </View>

                    {/* Barra de progreso inferior decorativa */}
                    <View className="h-1.5 w-full bg-primary/10">
                        <View
                            className={`
        h-full 
        ${percentage < 20 ? "bg-error" : percentage < 50 ? "bg-warning" : "bg-success"}
    `}
                            style={{ width: `${percentage}%` }}
                        />
                    </View>
                </View>
            </View>
        );
    }
);

export default ZoneCard;
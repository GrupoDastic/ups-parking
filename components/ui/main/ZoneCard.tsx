import React, { forwardRef } from "react";
import { View, StyleProp, ViewStyle, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import ThemedText from "@/components/shared/ThemedText";

export interface ZoneCardProps {
    zoneIdentifier: string;
    zoneName: string;
    availableSpaces: string;
    style?: StyleProp<ViewStyle>;
}

const ZoneCard = forwardRef<View, ZoneCardProps>(
    ({ zoneIdentifier, zoneName, availableSpaces, style }, ref) => {
        const spacesCount = parseInt(availableSpaces);
        const isFull = spacesCount === 0;

        return (
            <View
                ref={ref}
                style={[{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 10 },
                    shadowRadius: 20,
                    elevation: 8,
                    marginBottom: 16,
                }, style]}
            >
                <View
                    className="rounded-4xl overflow-hidden border border-white bg-white"
                >
                    <View className="p-6">
                        {/* HEADER: Badge Minimalista */}
                        <View className="flex-row justify-between items-start mb-6">
                            <View>
                                <ThemedText className="text-gray-500 text-[11px] font-bold uppercase tracking-[2px] mb-1">
                                    Bloque {zoneIdentifier}
                                </ThemedText>
                                <ThemedText className="text-2xl font-bold text-gray-900 tracking-tight">
                                    {zoneName}
                                </ThemedText>
                            </View>

                            <View className={`w-10 h-10 rounded-2xl items-center justify-center ${isFull ? 'bg-red-100' : 'bg-emerald-100'}`}>
                                <Feather
                                    name={isFull ? "lock" : "unlock"}
                                    size={20}
                                    color={isFull ? "#ef4444" : "#10b981"}
                                />
                            </View>
                        </View>

                        {/* INFO SECTION: Espacios */}
                        <View className="flex-row items-end justify-between">
                            <View>
                                <View className="flex-row items-baseline">
                                    <ThemedText className={`text-4xl font-black ${isFull ? 'text-red-500' : 'text-gray-900'}`}>
                                        {availableSpaces}
                                    </ThemedText>
                                    <ThemedText className="text-gray-500 font-medium ml-2 text-base">
                                        espacios
                                    </ThemedText>
                                </View>
                                <ThemedText className={`text-sm font-semibold ${isFull ? 'text-red-400' : 'text-emerald-600'}`}>
                                    {isFull ? "Zona saturada" : "Disponibilidad inmediata"}
                                </ThemedText>
                            </View>

                            {/* Botón de acción minimalista */}
                            <View className="bg-gray-900 px-4 py-2.5 rounded-full flex-row items-center">
                                <ThemedText className="text-white text-xs font-bold mr-2">VER</ThemedText>
                                <Feather name="arrow-right" size={14} color="white" />
                            </View>
                        </View>
                    </View>

                    {/* Barra de progreso inferior decorativa */}
                    <View className="h-1.5 w-full bg-black/5">
                        <View
                            className={`h-full ${isFull ? 'bg-red-500' : 'bg-emerald-500'}`}
                            style={{ width: isFull ? '100%' : '40%' }} // Aquí podrías calcular el % real
                        />
                    </View>
                </View>
            </View>
        );
    }
);

export default ZoneCard;
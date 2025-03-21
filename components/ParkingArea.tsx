import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import ParkingLot from "@/components/ParkingLot";
import ThemedView from "@/components/shared/ThemedView";
import ThemedPressable from "@/components/shared/ThemedPressable";
import ThemedText from "@/components/shared/ThemedText";
import { useQuery } from "@tanstack/react-query";
import { getAvailableZonesStrips } from "@/services/parkingService";
import Spinner from "./ui/spinner/Spinner";
import ErrorPage from "@/components/ErrorPage";
import { useThemeColor } from "@/hooks/useThemeColor";
import { RefreshControl } from "react-native-gesture-handler";

interface ParkingZoneProps {
    id: string;
}

const ParkingZone = ({ id }: ParkingZoneProps) => {
    const [strips, setStrips] = useState("1");

    const borderColor = useThemeColor({}, "line");
    const primary = useThemeColor({}, "primary");
    const primaryContainer = useThemeColor({}, "primaryContainer");
    const surfaceVariant = useThemeColor({}, "surfaceVariant");
    const textPrimary = useThemeColor({}, "text.primary");

    const stripsAvailable = useQuery({
        queryKey: ["strips", id],
        queryFn: () => getAvailableZonesStrips(id),
        retry: true,
        retryDelay: 5000,
        staleTime: 3000,
        refetchInterval: 5000,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchIntervalInBackground: true,
    });

    if (stripsAvailable.isError) {
        return <ErrorPage />;
    }

    const stripsData = stripsAvailable.data;
    const freeSpaces = stripsData?.strips[Number(strips)]?.free_spaces;

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={stripsAvailable.isLoading}
                    onRefresh={() => stripsAvailable.refetch()}
                />
            }
        >
            <ThemedView className="items-center justify-center px-4">

                {/* 🏷️ Título Principal con Separador */}
                <View className="w-full items-center my-5">
                    <ThemedText type="h2" className="text-center font-bold" style={{ color: textPrimary }}>
                        Zona de Parqueo {id}
                    </ThemedText>
                    <View className="border-b-2 w-1/2 mt-2" style={{ borderColor }} />
                </View>

                {stripsAvailable.isLoading ? (
                    <Spinner text="Cargando franjas disponibles" />
                ) : (
                    <>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
                            <View className="flex-row gap-x-2 items-center justify-around">
                                {stripsData?.strips.map(({ strip_id, strip_name }) => (
                                    <ThemedPressable
                                        key={strip_id}
                                        icon={"map"}
                                        size={16}
                                        title={`Franja ${strip_name}`}
                                        className="px-3 py-2 rounded-lg shadow-md"
                                        style={{
                                            backgroundColor: primaryContainer,
                                        }}
                                        onPress={() => setStrips(strip_id)}
                                    />
                                ))}
                            </View>
                        </ScrollView>

                        <ThemedText type="caption" className="text-center my-3" style={{ color: textPrimary }}>
                            Seleccione una franja para ver los parqueos disponibles
                        </ThemedText>
                    </>
                )}

                {/* 📌 Sección de Espacios Disponibles */}
                <View className="w-full p-4 rounded-lg shadow-md mt-4" style={{ backgroundColor: surfaceVariant }}>
                    <ThemedText type="h4" className="text-center font-semibold" style={{ color: textPrimary }}>
                        Mapa de Parqueos
                    </ThemedText>
                    <View className="border-b my-2" style={{ borderColor }} />
                    {freeSpaces && (
                        <ThemedText type="subtitle1" className="text-center font-bold" style={{ color: primary }}>
                            Espacios disponibles: {freeSpaces}
                        </ThemedText>
                    )}
                </View>

                {/* 🅿️ Mapa del Parqueo */}
                <ParkingLot id={id} strips={strips} />

                {/* 🚀 Botón para Parquear */}
                {!stripsAvailable.isLoading && (
                    <ThemedPressable
                        className="mb-6 px-5 py-3 rounded-lg shadow-lg"
                        icon={"car"}
                        title={`Parquear en la zona ${id}, franja ${strips}`}
                        style={{
                            backgroundColor: primary,
                        }}
                        onPress={() => console.log("Parquear")}
                    />
                )}
            </ThemedView>
        </ScrollView>
    );
};

export default ParkingZone;

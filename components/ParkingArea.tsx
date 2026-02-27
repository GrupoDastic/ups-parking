import React, {useState} from "react";
import {Dimensions, ScrollView, View, Image} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Ionicons} from "@expo/vector-icons";

import ParkingLot from "@/components/ParkingLot";
import ThemedText from "@/components/shared/ThemedText";
import ThemedPressable from "@/components/shared/ThemedPressable";
import Spinner from "@/components/ui/spinner/Spinner";
import ErrorPage from "@/components/ErrorPage";
import {
    assignParking,
    cancelReservation,
    confirmReservation,
    getAvailableZonesStrips,
    reserveParking
} from "@/services/parkingService";
import {AppModal} from "@/components/ui/modal";
import {useColorScheme} from "nativewind";

import * as Speech from "expo-speech";
import Toast from "react-native-toast-message";
import ReservationModal from "@/components/zone/Reservation-Modal";

const imageById = [
    {id: 1, image: require("@/assets/images/map/zone1.jpg")},
    {id: 2, image: require("@/assets/images/map/zone2.jpg")},
    {id: 3, image: require("@/assets/images/map/zone3.jpg")},
    {id: 4, image: require("@/assets/images/map/zone2.jpg")},
    {id: 5, image: require("@/assets/images/map/zone4.jpg")},
];

export default function ParkingZone() {
    const {id, name, identifier} = useLocalSearchParams<{
        id: string;
        name?: string;
        identifier?: string;
    }>();

    const [selectedStrip, setSelectedStrip] = useState("1");
    const [mapModalVisible, setMapModalVisible] = useState(false);
    const [reservationModalVisible, setReservationModalVisible] = useState(false);
    const {colorScheme} = useColorScheme();
    const queryClient = useQueryClient();



    const [reservation, setReservation] = useState(null);

    const reserveMutation = useMutation({
        mutationFn: (spaceId: string) =>
            reserveParking(id, selectedStrip, spaceId),
        onSuccess: (data) => {
            setReservation(data);
            setReservationModalVisible(true);

            // Voz + toast
            const num = data.parking_space.number ?? data.parking_space.identifier;
            Speech.stop();
            Speech.speak(`Reserva creada para el espacio ${num}. Tiene ${Math.floor(data.expires_in_seconds / 60)} minutos para confirmar y parquear.`, { language: "es-ES" });

            Toast.show({
                type: "info",
                text1: "Reserva creada",
                text2: `Espacio ${num}. Confirme en ${Math.floor(data.expires_in_seconds / 60)} min`,
                position: "top",
                visibilityTime: 3000,
            });

            // invalidar strips/zones? No todavía; la reserva ya cambió estado a 'reserved',
            // podrías invalidar para mostrar ocupación temporal:
            queryClient.invalidateQueries({ queryKey: ["strips", id] });
            queryClient.invalidateQueries({ queryKey: ["zones"] });
        },
        onError: (err: any) => {
            Toast.show({ type: "error", text1: "No se pudo reservar", text2: err.message });
        }
    });

    const confirmMutation = useMutation({
        mutationFn: (token: string) => confirmReservation(id, selectedStrip, token),
        onSuccess: (data) => {
            Speech.stop();
            const num = data.parking_space.number ?? data.parking_space.identifier;
            Speech.speak(`Reserva confirmada. Espacio ${num} ocupado.`, { language: "es-ES" });

            Toast.show({ type: "success", text1: "Reserva confirmada", text2: `Espacio ${num} ocupado` });

            // refrescar
            queryClient.invalidateQueries({ queryKey: ["parkingSpaces", id, selectedStrip] });
            queryClient.invalidateQueries({ queryKey: ["strips", id] });
            queryClient.invalidateQueries({ queryKey: ["zones"] });
        },
        onError: (err: any) => {
            Toast.show({ type: "error", text1: "Error al confirmar", text2: err.message });
        }
    });

    const cancelMutation = useMutation({
        mutationFn: (token: string) => cancelReservation(id, selectedStrip, token),
        onSuccess: (data) => {
            Toast.show({ type: "info", text1: "Reserva cancelada" });
            queryClient.invalidateQueries({ queryKey: ["strips", id] });
            queryClient.invalidateQueries({ queryKey: ["zones"] });
        },
        onError: (err: any) => {
            Toast.show({ type: "error", text1: "Error al cancelar", text2: err.message });
        }
    });



    const stripsQuery = useQuery({
        queryKey: ["strips", id],
        queryFn: () => getAvailableZonesStrips(id),
        refetchInterval: 5000,
    });

    if (!id) {
        return (
            <View className="flex-1 items-center justify-center bg-background">
                <ThemedText>ID de zona no válido</ThemedText>
            </View>
        );
    }

    if (stripsQuery.isError) {
        return <ErrorPage onRetry={stripsQuery.refetch}/>;
    }

    const strips = stripsQuery.data?.strips ?? [];

    async function handleConfirm(token: string) {
        await confirmMutation.mutateAsync(token);
        setReservationModalVisible(false);
        setReservation(null);
    }

    async function handleCancel(token: string) {
        await cancelMutation.mutateAsync(token);
        setReservationModalVisible(false);
        setReservation(null);
    }

    return (
        <View className="flex-1 bg-background">
            <ScrollView
                contentContainerStyle={{
                    padding: 16,
                    paddingBottom: 40,
                }}
            >

                {/* ================= HEADER CARD ================= */}
                <View
                    className="rounded-3xl bg-surface border border-primary/10 mb-5"
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {width: 0, height: 10},
                        shadowRadius: 20,
                        shadowOpacity: 0.2,
                        elevation: 8,
                    }}
                >
                    <View className="p-6">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="location-outline"
                                      color={colorScheme === "dark" ? "rgb(255,255,255)" : "rgb(0,0,0)"}
                                      size={26}/>
                            <ThemedText type="h4" className="ml-2">
                                Bloque {identifier}
                            </ThemedText>
                        </View>

                        <ThemedText className="text-muted">
                            {name}
                        </ThemedText>
                    </View>
                </View>

                {/* ================= STRIPS CARD ================= */}
                <View
                    className="rounded-3xl bg-surface border border-primary/10 mb-5"
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {width: 0, height: 6},
                        shadowRadius: 14,
                        shadowOpacity: 0.15,
                        elevation: 6,
                    }}
                >
                    <View className="p-6">
                        <ThemedText type="subtitle1">
                            Franjas disponibles
                        </ThemedText>

                        {stripsQuery.isLoading ? (
                            <Spinner text="Cargando franjas..."/>
                        ) : (
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                className="mt-3"
                            >
                                <View className="flex-row gap-3">
                                    {strips.map((s) => (
                                        <ThemedPressable
                                            key={s.strip_identifier}
                                            title={`Franja ${s.strip_name}`}
                                            disabled={s.free_spaces === "0"}
                                            isActive={
                                                selectedStrip === s.strip_identifier.toString()
                                            }
                                            onPress={() =>
                                                setSelectedStrip(s.strip_identifier.toString())
                                            }
                                        />
                                    ))}
                                </View>
                            </ScrollView>
                        )}
                    </View>
                </View>

                {/* ================= MAP CARD ================= */}
                <View
                    className="rounded-3xl bg-surface border border-primary/10 mb-6"
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {width: 0, height: 10},
                        shadowRadius: 20,
                        shadowOpacity: 0.2,
                        elevation: 8,
                    }}
                >
                    <View className="p-6">
                        <View className="flex-row justify-between items-center mb-3">
                            <ThemedText type="subtitle1">
                                Plano de la franja
                            </ThemedText>

                            <ThemedPressable
                                title="Ver mapa"
                                icon="map"
                                onPress={() => setMapModalVisible(true)}
                            />
                        </View>

                        {/* MAP CONTAINER */}
                        <View
                            className="overflow-hidden items-center justify-center">
                            <ThemedText className="text-muted">
                                Vista previa del plano
                            </ThemedText>
                            <ParkingLot
                                id={id}
                                strips={selectedStrip}
                                onSpacePress={(space) => {
                                    if (space.status !== "free") return;

                                    console.log("Espacio seleccionado:", space.id);

                                    reserveMutation.mutate(space.id);
                                }}
                            />
                        </View>

                        {/* PRIMARY ACTION */}
                    </View>
                </View>
                <ReservationModal
                    visible={reservationModalVisible}
                    reservation={reservation}
                    onClose={() => {
                        setReservationModalVisible(false);
                        setReservation(null);
                    }}
                    onConfirm={handleConfirm}
                    onCancelReservation={handleCancel}
                />
                {/* ================= MODAL ================= */}
                {renderMapModal()}
            </ScrollView>
        </View>
    );

    function renderMapModal() {
        const {height} = Dimensions.get("window");

        return (
            <AppModal
                visible={mapModalVisible}
                onClose={() => {
                    setMapModalVisible(false);
                }}
            >
                {/* HEADER */}
                <View>
                    <ThemedText type="subtitle1">
                        Mapa completo
                    </ThemedText>
                    <ThemedText type="body1">
                        {name}
                    </ThemedText>
                </View>

                {/* MAP CONTAINER */}
                <View
                    style={{height: height * 0.3}} // 👈 2/3 visual dentro del modal
                    className="items-center justify-center"
                >
                    <Image
                        source={imageById.find(i => i.id === Number(id))?.image}
                        resizeMode="contain"
                        style={[
                            {
                                width: "100%",
                            }
                        ]}
                    />
                </View>
            </AppModal>
        );
    }
}

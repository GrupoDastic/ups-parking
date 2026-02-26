import React, {useState} from "react";
import {Dimensions, ScrollView, View, Image} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {useQuery} from "@tanstack/react-query";
import {Ionicons} from "@expo/vector-icons";

import ParkingLot from "@/components/ParkingLot";
import ThemedText from "@/components/shared/ThemedText";
import ThemedPressable from "@/components/shared/ThemedPressable";
import Spinner from "@/components/ui/spinner/Spinner";
import ErrorPage from "@/components/ErrorPage";
import {getAvailableZonesStrips} from "@/services/parkingService";
import {AppModal} from "@/components/ui/modal";

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
    const [modalVisible, setModalVisible] = useState(false);

    if (!id) {
        return (
            <View className="flex-1 items-center justify-center bg-background">
                <ThemedText>ID de zona no válido</ThemedText>
            </View>
        );
    }

    const stripsQuery = useQuery({
        queryKey: ["strips", id],
        queryFn: () => getAvailableZonesStrips(id),
        refetchInterval: 5000,
    });

    if (stripsQuery.isError) {
        return <ErrorPage onRetry={stripsQuery.refetch}/>;
    }

    const strips = stripsQuery.data?.strips ?? [];

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
                            <Ionicons name="location-outline" size={26}/>
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
                                onPress={() => setModalVisible(true)}
                            />
                        </View>

                        {/* MAP CONTAINER */}
                        <View
                            className="overflow-hidden items-center justify-center">
                            <ThemedText className="text-muted">
                                Vista previa del plano
                            </ThemedText>
                            <ParkingLot id={id} strips={selectedStrip}/>
                        </View>

                        {/* PRIMARY ACTION */}
                        <ThemedPressable
                            title={`Parquear en franja ${selectedStrip}`}
                            icon="car"
                            className="bg-secondary mt-5"
                        />
                    </View>
                </View>

                {/* ================= MODAL ================= */}
                {renderMapModal()}
            </ScrollView>
        </View>
    );

    function renderMapModal() {
        const {height} = Dimensions.get("window");

        return (
            <AppModal
                visible={modalVisible}
                onClose={() => {
                    setModalVisible(false);
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

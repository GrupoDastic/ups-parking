import React, { useState } from "react";
import {
    View,
    ScrollView,
    Modal,
    StyleSheet,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

import ParkingLot from "@/components/ParkingLot";
import ThemedText from "@/components/shared/ThemedText";
import ThemedPressable from "@/components/shared/ThemedPressable";
import Spinner from "@/components/ui/spinner/Spinner";
import ErrorPage from "@/components/ErrorPage";
import { getAvailableZonesStrips } from "@/services/parkingService";
import { useAppTheme } from "@/hooks/useAppTheme";

const imageById = [
    { id: 1, image: require("@/assets/images/map/zone1.jpg") },
    { id: 2, image: require("@/assets/images/map/zone2.jpg") },
    { id: 3, image: require("@/assets/images/map/zone3.jpg") },
    { id: 4, image: require("@/assets/images/map/zone2.jpg") },
    { id: 5, image: require("@/assets/images/map/zone4.jpg") },
];

export default function ParkingZone() {
    const { id, name, identifier } = useLocalSearchParams<{
        id: string;
        name?: string;
        identifier?: string;
    }>();

    const theme = useAppTheme();
    const [selectedStrip, setSelectedStrip] = useState("1");
    const [modalVisible, setModalVisible] = useState(false);

    if (!id) {
        return (
            <View style={styles.center}>
                <ThemedText>ID de zona no válido</ThemedText>
            </View>
        );
    }

    /* ---------- DATA ---------- */
    const stripsQuery = useQuery({
        queryKey: ["strips", id],
        queryFn: () => getAvailableZonesStrips(id),
        refetchInterval: 5000,
    });

    if (stripsQuery.isError) {
        return <ErrorPage onRetry={stripsQuery.refetch} />;
    }

    const strips = stripsQuery.data?.strips ?? [];

    /* ---------- MAP GESTURES ---------- */
    const scale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onEnd(() => {
            scale.value = scale.value === 1 ? 2 : 1;
            translateX.value = 0;
            translateY.value = 0;
        });

    const pan = Gesture.Pan().onUpdate((e) => {
        if (scale.value > 1) {
            translateX.value += e.changeX;
            translateY.value += e.changeY;
        }
    });

    const imageStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: withSpring(translateX.value) },
            { translateY: withSpring(translateY.value) },
            { scale: withSpring(scale.value) },
        ],
    }));

    /* ---------- UI ---------- */
    return (
        <View>
            <ScrollView contentContainerStyle={styles.scroll}>
                {/* HEADER */}
                <View style={[styles.card, { backgroundColor: theme.surface }]}>
                    <Ionicons name="location-outline" size={28} color={theme.primary} />
                    <ThemedText type="h4">Bloque {identifier}</ThemedText>
                    <ThemedText type="body2">{name}</ThemedText>
                </View>

                {/* STRIPS */}
                <View style={[styles.card, { backgroundColor: theme.surface }]}>
                    <ThemedText type="subtitle1">Franjas disponibles</ThemedText>

                    {stripsQuery.isLoading ? (
                        <Spinner text="Cargando franjas..." />
                    ) : (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.row}>
                                {strips.map((s) => (
                                    <ThemedPressable
                                        key={s.strip_identifier}
                                        title={`Franja ${s.strip_name}`}
                                        disabled={s.free_spaces === "0"}
                                        isActive={selectedStrip === s.strip_identifier}
                                        onPress={() => setSelectedStrip(s.strip_identifier)}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    )}
                </View>

                {/* PARKING LOT */}
                <View style={[styles.card, { backgroundColor: theme.surface }]}>
                    <View style={styles.headerRow}>
                        <ThemedText type="subtitle1">Plano</ThemedText>
                        <ThemedPressable
                            title="Ver mapa"
                            icon="map"
                            onPress={() => setModalVisible(true)}
                        />
                    </View>

                    <View style={[styles.mapBox, { backgroundColor: theme.surfaceVariant }]}>
                        <ParkingLot id={id} strips={selectedStrip} />
                    </View>

                    <ThemedPressable
                        title={`Parquear en franja ${selectedStrip}`}
                        icon="car"
                        style={{ backgroundColor: theme.primary }}
                    />
                </View>
            </ScrollView>

            {/* MODAL */}
            <Modal visible={modalVisible} transparent animationType="fade">
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <View style={styles.modalBackdrop}>
                        <View style={styles.modalCard}>
                            <GestureDetector gesture={Gesture.Simultaneous(doubleTap, pan)}>
                                <Animated.Image
                                    source={imageById.find((i) => i.id === Number(id))?.image}
                                    resizeMode="contain"
                                    style={[styles.modalImage, imageStyle]}
                                />
                            </GestureDetector>

                            <ThemedPressable
                                title="Cerrar"
                                onPress={() => {
                                    scale.value = 1;
                                    translateX.value = 0;
                                    translateY.value = 0;
                                    setModalVisible(false);
                                }}
                            />
                        </View>
                    </View>
                </GestureHandlerRootView>
            </Modal>
        </View>
    );
}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
    root: { flex: 1 },
    scroll: { padding: 16, gap: 16 },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },

    card: {
        padding: 16,
        borderRadius: 16,
        gap: 8,
        elevation: 2,
    },

    row: {
        flexDirection: "row",
        gap: 8,
        marginTop: 8,
    },

    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    mapBox: {
        height: 280,
        borderRadius: 16,
        overflow: "hidden",
        marginVertical: 12,
    },

    modalBackdrop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    modalCard: {
        width: "90%",
        height: "60%",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 12,
    },

    modalImage: {
        width: "100%",
        height: "100%",
    },
});

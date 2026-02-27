import React, { useEffect, useRef, useState } from "react";
import { Modal, View, Pressable, Animated, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ThemedText from "@/components/shared/ThemedText";
import { useColorScheme } from "nativewind";
import * as Speech from "expo-speech";
import Toast from "react-native-toast-message";

type Reservation = {
    reservation_token: string;
    reservation_expires?: string;
    parking_space: any;
    expires_in_seconds?: number;
};

type Props = {
    visible: boolean;
    onClose: () => void;
    reservation?: Reservation | null;
    onConfirm: (token: string) => Promise<void>;
    onCancelReservation: (token: string) => Promise<void>;
};

export default function ReservationModal({
                                             visible,
                                             onClose,
                                             reservation,
                                             onConfirm,
                                             onCancelReservation,
                                         }: Props) {
    const { colorScheme } = useColorScheme();
    const [secondsLeft, setSecondsLeft] = useState<number>(reservation?.expires_in_seconds ?? 0);
    const totalSecondsRef = useRef<number>(reservation?.expires_in_seconds ?? 0);
    const progress = useRef(new Animated.Value(0)).current;
    const token = reservation?.reservation_token;

    // reset when new reservation arrives
    useEffect(() => {
        const secs = reservation?.expires_in_seconds ?? 0;
        totalSecondsRef.current = secs;
        setSecondsLeft(secs);
        progress.setValue(secs > 0 ? (1 - secs / Math.max(secs, 1)) : 1);
    }, [reservation?.reservation_token]);

    // countdown
    useEffect(() => {
        if (!visible || !reservation) return;
        if (secondsLeft <= 0) return;

        const t = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
        return () => clearInterval(t);
    }, [visible, reservation, secondsLeft]);

    // animate progress
    useEffect(() => {
        const total = totalSecondsRef.current || 1;
        const pct = total > 0 ? Math.max(0, 1 - secondsLeft / total) : 1;
        Animated.timing(progress, {
            toValue: pct,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [secondsLeft, progress]);

    // on expiry: auto cancel
    useEffect(() => {
        if (!reservation) return;
        if (secondsLeft > 0) return;

        (async () => {
            try {
                if (!token) return;
                Speech.stop();
                Speech.speak("Reserva expirada", { language: "es-ES", rate: 0.95 });
                Toast.show({ type: "info", text1: "Reserva expirada", text2: "El espacio ha sido liberado." });
                await onCancelReservation(token);
            } catch (err: any) {
                Toast.show({ type: "error", text1: "Error", text2: err?.message ?? "No se pudo cancelar la reserva" });
            } finally {
                onClose();
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [secondsLeft]);

    const format = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${String(s).padStart(2, "0")}`;
    };

    if (!reservation) return null;

    // progress width
    const progressWidth = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
    });

    // color selection
    const remainingPct = totalSecondsRef.current ? secondsLeft / totalSecondsRef.current : 0;
    const barColor = remainingPct <= 0.2 ? "#ef4444" : remainingPct <= 0.5 ? "#f59e0b" : "#16a34a"; // red/yellow/green

    // card bg depending on theme
    const cardBg = colorScheme === "dark" ? "bg-zinc-900" : "bg-white";
    const subtleBg = colorScheme === "dark" ? "bg-zinc-800" : "bg-gray-100";
    const textPrimary = colorScheme === "dark" ? "text-white" : "text-black";
    const textMuted = "text-muted"; // your ThemedText handles actual muted color

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View className="flex-1 justify-center items-center" style={{ backgroundColor: "rgba(0,0,0,0.45)" }}>
                <View className={`w-[94%] rounded-2xl p-5 ${cardBg} shadow-lg`}>
                    {/* header */}
                    <View className="flex-row items-center justify-between">
                        <View>
                            <ThemedText type="h4">Reserva temporal</ThemedText>
                            <ThemedText className="text-muted text-sm">Confirma tu espacio antes de que expire</ThemedText>
                        </View>

                        <View className={`w-12 h-12 rounded-xl items-center justify-center ${subtleBg}`}>
                            <Ionicons name="car" size={26} color={colorScheme === "dark" ? "#93C5FD" : "#1E40AF"} />
                        </View>
                    </View>

                    {/* info */}
                    <View className="mt-4">
                        <ThemedText type="h3" className="text-lg">
                            Espacio {reservation.parking_space.identifier}
                        </ThemedText>

                        <ThemedText className="text-muted text-sm mt-1">
                            Franja: {reservation.parking_space.strip_identifier ?? "—"} · Tipo: {reservation.parking_space.type}
                        </ThemedText>
                    </View>

                    {/* countdown + progress */}
                    <View className="mt-4">
                        <View className="flex-row items-center justify-between">
                            <ThemedText type="h3" className="text-2xl">
                                {format(secondsLeft)}
                            </ThemedText>
                            <ThemedText className="text-muted text-sm">{secondsLeft > 0 ? "Tiempo restante" : "Expirado"}</ThemedText>
                        </View>

                        <View className="h-3 w-full bg-muted/20 rounded-full mt-3 overflow-hidden">
                            <Animated.View
                                style={{
                                    width: progressWidth,
                                    backgroundColor: barColor,
                                    height: "100%",
                                    borderRadius: 999,
                                }}
                            />
                        </View>
                    </View>

                    {/* actions */}
                    <View className="flex-row gap-3 mt-5">
                        <Pressable
                            onPress={async () => {
                                if (!token) return;
                                try {
                                    await onCancelReservation(token);
                                    Toast.show({ type: "info", text1: "Reserva cancelada" });
                                } catch (err: any) {
                                    Toast.show({ type: "error", text1: "Error al cancelar", text2: err?.message ?? "" });
                                } finally {
                                    onClose();
                                }
                            }}
                            className={`flex-1 rounded-lg px-4 py-3 items-center justify-center ${colorScheme === "dark" ? "bg-zinc-800" : "bg-gray-100"}`}
                        >
                            <ThemedText className={`${textPrimary}`}>Cancelar</ThemedText>
                        </Pressable>

                        <Pressable
                            onPress={async () => {
                                if (!token) return;
                                try {
                                    await onConfirm(token);
                                    Toast.show({ type: "success", text1: "Reserva confirmada", text2: `Espacio ${reservation.parking_space.identifier} ocupado` });
                                    Speech.stop();
                                    Speech.speak("Reserva confirmada. Espacio ocupado.", { language: "es-ES", rate: 0.95 });
                                } catch (err: any) {
                                    Toast.show({ type: "error", text1: "Error al confirmar", text2: err?.message ?? "" });
                                } finally {
                                    onClose();
                                }
                            }}
                            className="flex-1 rounded-lg px-4 py-3 items-center justify-center bg-secondary"
                        >
                            <ThemedText className="text-white font-gill-bold">Confirmar</ThemedText>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
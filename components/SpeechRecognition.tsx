/**
 * SpeechRecognition.tsx
 * --------------------------------------------------------------
 *  • Pulsing FAB mientras el micrófono está activo
 *  • Respuestas TTS en español
 *  • Los botones sólo muestran icono (sin texto)
 *  • Todas las clases Tailwind; inline style sólo para la animación
 * --------------------------------------------------------------
 */

import React, { useEffect } from "react";
import { View } from "react-native";
import { ExpoSpeechRecognitionModule } from "expo-speech-recognition";
import * as Speech from "expo-speech";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

import { useVoiceRecognition } from "@/hooks/useSpeechRecognition";
import { getParkingAvailable } from "@/services/parkingService";
import ThemedPressable from "@/components/shared/ThemedPressable";
import ThemedText from "@/components/shared/ThemedText";

export interface SpeechRecognitionProps {
    /** Extra Tailwind classes forwarded to wrapper */
    className?: string;
}

/* ------------------------------------------------------------------ */
/* Pulse helper – returns a Re‑animated style object                  */
const usePulse = (active: boolean) => {
    const scale = useSharedValue(1);

    if (active) {
        scale.value = withRepeat(
            withSequence(
                withTiming(1.15, { duration: 350 }),
                withTiming(1, { duration: 350 }),
            ),
            -1,
            true,
        );
    } else {
        scale.value = 1;
    }

    return useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));
};

/* ------------------------------------------------------------------ */
const SpeechRecognition: React.FC<SpeechRecognitionProps> = ({ className }) => {
    const { recognizing, transcript, setTranscript, handleStart } =
        useVoiceRecognition();

    /* Pulsing scale while listening */
    const pulseStyle = usePulse(recognizing);

    /* Run NLP + TTS once recognition finishes */
    useEffect(() => {
        if (recognizing || transcript.length === 0) return;

        (async () => {
            try {
                const res = await getParkingAvailable(encodeURIComponent(transcript));
                const text = res?.text ?? "No se encontraron resultados";
                Speech.speak(text, { language: "es-ES" });
            } catch {
                Speech.speak("Ha ocurrido un error", { language: "es-ES" });
            } finally {
                setTranscript("");
            }
        })();
    }, [recognizing]);

    /* ---------------------------------------------------------------- */
    return (
        <Animated.View style={pulseStyle} className={className}>
            {recognizing ? (
                <ThemedPressable
                    icon="stop"
                    title="Detener"
                    onPress={ExpoSpeechRecognitionModule.stop}
                />
            ) : (
                <ThemedPressable
                    icon="footsteps"
                    title="Parquear tu auto"
                    onPress={handleStart}
                />
            )}

            {transcript.length > 0 && (
                <ThemedText
                    type="caption"
                    className="mt-1 text-center max-w-[180px] truncate"
                >
                    {transcript}
                </ThemedText>
            )}
        </Animated.View>
    );
};

export default SpeechRecognition;

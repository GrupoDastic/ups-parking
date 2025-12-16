import React, { useEffect } from "react";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { ExpoSpeechRecognitionModule } from "expo-speech-recognition";
import * as Speech from "expo-speech";

import { useVoiceRecognition } from "@/hooks/useSpeechRecognition";
import { getParkingAvailable } from "@/services/parkingService";
import { View, Pressable, Platform } from "react-native";

const usePulse = (active: boolean) => {
    const scale = useSharedValue(1);
    if (active) {
        scale.value = withRepeat(
            withSequence(
                withTiming(1.15, { duration: 350 }),
                withTiming(1, { duration: 350 }),
            ),
            -1,
            true
        );
    } else {
        scale.value = 1;
    }

    return useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));
};

const VoiceButton = () => {
    const { recognizing, transcript, setTranscript, handleStart } = useVoiceRecognition();
    const pulseStyle = usePulse(recognizing);

    useEffect(() => {
        if (recognizing || transcript.length === 0) return;

        (async () => {
            try {
                const res = await getParkingAvailable(transcript);
                console.log(transcript);
                const text = res?.respuesta ?? "No se encontraron resultados";
                Speech.speak(text, { language: "es-ES" });
            } catch {
                Speech.speak("Ha ocurrido un error", { language: "es-ES" });
            } finally {
                setTranscript("");
            }
        })();
    }, [recognizing]);

    return (
        <Animated.View
            className="absolute z-50 right-5"
            style={[
                pulseStyle,
                {
                    bottom: Platform.OS === "ios" ? 85 : 20,
                },
            ]}
        >
            <Pressable
                onPress={recognizing ? ExpoSpeechRecognitionModule.stop : handleStart}
                className="w-14 h-14 bg-blue-700 rounded-full justify-center items-center shadow-md"
                android_ripple={{ color: "#1A3E72", borderless: true }}
            >
                <Ionicons name={recognizing ? "stop" : "mic-outline"} size={24} color="white" />
            </Pressable>
        </Animated.View>
    );
};

export default VoiceButton;

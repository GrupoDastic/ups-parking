import {useEffect, useState} from "react";
import {ExpoSpeechRecognitionModule, useSpeechRecognitionEvent} from "expo-speech-recognition";

export const useVoiceRecognition = () => {
    const [recognizing, setRecognizing] = useState(false);
    const [transcript, setTranscript] = useState("");

    useEffect(() => {
        (async () => {
            const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
            if (!result.granted) {
                console.error("Permiso de reconocimiento de voz denegado");
            }
        })();
    }, []);

    useSpeechRecognitionEvent("start", () => {
            setRecognizing(true);
        }
    );
    useSpeechRecognitionEvent("end", () => setRecognizing(false));
    useSpeechRecognitionEvent("result", (event) => setTranscript(event.results[0]?.transcript));
    useSpeechRecognitionEvent("error", (event) => console.error(event.error));

    const handleStart = async () => {
        try {
            ExpoSpeechRecognitionModule.start({
                lang: "es-ES",
                requiresOnDeviceRecognition: false,
                addsPunctuation: false,
            });
        } catch (error) {
            console.error("Error al iniciar reconocimiento:", error);
        }
    };

    return {recognizing, transcript, setTranscript, handleStart};
}

import {useState} from "react";
import {ExpoSpeechRecognitionModule, useSpeechRecognitionEvent} from "expo-speech-recognition";

export const useVoiceRecognition = () => {
    const [recognizing, setRecognizing] = useState(false);
    const [transcript, setTranscript] = useState("");

    useSpeechRecognitionEvent("start", () => setRecognizing(true));
    useSpeechRecognitionEvent("end", () => setRecognizing(false));
    useSpeechRecognitionEvent("result", (event) => setTranscript(event.results[0]?.transcript));
    useSpeechRecognitionEvent("error", (event) => console.error(event.error));

    const handleStart = async () => {
        const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
        if (!result.granted) {
            console.error("Permission to access speech recognition is not granted");
            return;
        }

        ExpoSpeechRecognitionModule.start({
            lang: "es-ES",
            requiresOnDeviceRecognition: false,
            addsPunctuation: false,
        })
    }

    return {recognizing, transcript, handleStart};
}

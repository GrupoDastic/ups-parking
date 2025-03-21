import {useVoiceRecognition} from "@/hooks/useSpeechRecognition";
import {ExpoSpeechRecognitionModule} from "expo-speech-recognition";
import {useEffect} from "react";
import ThemedPressable from "@/components/shared/ThemedPressable";
import ThemedText from "@/components/shared/ThemedText";
import {View} from "react-native";

interface SpeechRecognitionProps {
    className?: string;
}

export default function SpeechRecognition({className}: Readonly<SpeechRecognitionProps>) {

    const {recognizing, transcript, setTranscript, handleStart} = useVoiceRecognition();
    useEffect(() => {
        if (!recognizing) {
            speak();
        }
    }, [recognizing]);

    const speak = () => {
        if (transcript.length === 0) {
            return;
        }

        // getParkingAvailable(encodeURIComponent(transcript)).then((response) => {
        //     if (response === null || response === undefined) {
        //         Speech.speak("No se encontraron resultados", {
        //             language: "es-ES",
        //         });
        //     } else {
        //         Speech.speak(response.text, {
        //             language: 'es-ES'
        //         });
        //
        //     }
        // });

        setTranscript("");
    }


    return (
        <View className={className}>
            {
                !recognizing ? (
                    <ThemedPressable icon={'footsteps'} title="¡Parquea tu auto!" onPress={handleStart}/>
                ) : (
                    <ThemedPressable icon={'stop'} title="Detener" onPress={ExpoSpeechRecognitionModule.stop}/>
                )
            }

            <ThemedText>
                {transcript}
            </ThemedText>
        </View>
    );
};


import {StyleSheet} from "react-native";
import {useVoiceRecognition} from "@/hooks/useSpeechRecognition";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {ThemedPressable} from "@/components/ThemedPressable";
import {ExpoSpeechRecognitionModule} from "expo-speech-recognition";
import * as Speech from 'expo-speech';
import {useEffect} from "react";
import {getParkingAvailable} from "@/services/parkingService";

export default function SpeechRecognition() {

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

        getParkingAvailable(encodeURIComponent(transcript)).then((response) => {
            Speech.speak(response.text, {
                language: 'es-ES'
            });
        });

        setTranscript("");
    }


    return (
        <ThemedView style={styles.container}>

            {
                !recognizing ? (
                    <ThemedPressable
                        style={styles.button}
                        onPress={handleStart}
                    >
                        <ThemedText type="defaultSemiBold" style={styles.text}>
                            Presiona el botón para comenzar a hablar
                        </ThemedText>
                    </ThemedPressable>
                ) : (
                    <ThemedPressable
                        onPress={() => ExpoSpeechRecognitionModule.stop()}
                    >
                        <ThemedText type="defaultSemiBold" style={styles.text}>
                            Presiona el botón para detener
                        </ThemedText>
                    </ThemedPressable>
                )

            }

            <ThemedText type="defaultSemiBold" style={styles.text}>
                {transcript}
            </ThemedText>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems:
            'center',
        marginTop:
            20
    }
    ,
    text: {
        textAlign: 'center',
        margin: 10,
        color: 'white'
    },
    button: {
        padding: 10,
        borderRadius: 10,
    }
});


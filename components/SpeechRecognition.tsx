import {ScrollView, StyleSheet} from "react-native";
import {useVoiceRecognition} from "@/hooks/useSpeechRecognition";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {ThemedPressable} from "@/components/ThemedPressable";
import {ExpoSpeechRecognitionModule} from "expo-speech-recognition";

export default function SpeechRecognition() {

    const {recognizing, transcript, handleStart} = useVoiceRecognition();

    return (
        <ScrollView>

            <ThemedView style={styles.container}>

                {
                    !recognizing ? (
                        <ThemedPressable
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems:
            'center',
        marginTop:
            50
    }
    ,
    text: {
        textAlign: 'center',
        margin:
            10,
    }
});


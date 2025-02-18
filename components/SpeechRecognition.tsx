import {StyleSheet} from "react-native";
import {useVoiceRecognition} from "@/hooks/useSpeechRecognition";
import {ExpoSpeechRecognitionModule} from "expo-speech-recognition";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {ThemedButton} from "@/components/ThemedButton";

export default function SpeechRecognition() {
    const {recognizing, transcript, handleStart} = useVoiceRecognition();
    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.text}>Reconocimiento de Voz</ThemedText>
            {!recognizing ? (
                <ThemedButton title="Start" onPress={handleStart}/>
            ) : (
                <ThemedButton
                    title="Stop"
                    onPress={() => ExpoSpeechRecognitionModule.stop()}
                />
            )}
            <ThemedText style={styles.text}>{transcript}</ThemedText>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        margin: 10,
    }
});


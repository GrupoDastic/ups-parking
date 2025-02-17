import {Button, StyleSheet, Text, View} from "react-native";
import {useVoiceRecognition} from "@/hooks/useSpeechRecognition";
import {ExpoSpeechRecognitionModule} from "expo-speech-recognition";

export default function AboutScreen() {
    const {recognizing, transcript, handleStart} = useVoiceRecognition();
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Reconocimiento de Voz</Text>
            {!recognizing ? (
                <Button title="Start" onPress={handleStart} />
            ) : (
                <Button
                    title="Stop"
                    onPress={() => ExpoSpeechRecognitionModule.stop()}
                />
            )}
            <Text style={styles.text}>{transcript}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#333333',
    }
});


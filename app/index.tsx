import {SafeAreaView, StyleSheet} from "react-native";
import ParkingMap from "@/components/ParkingMap";
import {ThemedView} from "@/components/ThemedView";
import SpeechRecognition from "@/components/SpeechRecognition";
import {ThemedText} from "@/components/ThemedText";

const IndexScreen = () => {

    return (
        <SafeAreaView style={{flex: 1}}>
            <ThemedView style={styles.container}>
                <ParkingMap />
                <SpeechRecognition/>
            </ThemedView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default IndexScreen;

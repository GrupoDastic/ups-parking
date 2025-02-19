import {SafeAreaView, StyleSheet} from "react-native";
import ParkingMap from "@/components/ParkingMap";
import {ThemedView} from "@/components/ThemedView";
import SpeechRecognition from "@/components/SpeechRecognition";
import Header from "@/components/Header";

const IndexScreen = () => {

    return (
        <SafeAreaView style={{flex: 1}}>
            <ThemedView style={styles.container}>
                <ThemedView>
                    <Header/>
                </ThemedView>
                <ThemedView>
                    <ParkingMap/>
                </ThemedView>
                <ThemedView>
                    <SpeechRecognition/>
                </ThemedView>
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

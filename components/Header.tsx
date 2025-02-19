import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {StyleSheet} from "react-native";

const MyComponent = () => {
    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">Parqueo UPS</ThemedText>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 70,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MyComponent;

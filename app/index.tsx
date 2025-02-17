import {Text, View, StyleSheet} from "react-native";
import {Link} from "expo-router";

const IndexScreen = () => {



    return (
        <View style={styles.container}>
            <Text style={styles.text}>Edit app/index.tsx to edit this screen.</Text>
            <Link href="/about" style={styles.button}>Go to About</Link>
        </View>
    );
}

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
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 5,
    }
});

export default IndexScreen;

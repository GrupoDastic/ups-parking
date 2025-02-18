import {ThemedView} from "@/components/ThemedView";
import zone1Coords from '@/constants/image_coordinates_zone_1';
import zone2Coords from '@/constants/image_coordinates_zone_2';
import zone3Coords from '@/constants/image_coordinates_zone_3';
import zone4Coords from '@/constants/image_coordinates_zone_4';
import {useState} from "react";
import {Image} from "expo-image";
import {ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {ThemedText} from "@/components/ThemedText";

const zone1 = require('@/assets/images/map/zone1.jpg');
const zone2 = require('@/assets/images/map/zone2.jpg');
const zone3 = require('@/assets/images/map/zone3.jpg');
const zone4 = require('@/assets/images/map/zone4.jpg');

const zones = [
    {
        id: 1,
        image: zone1,
        coords: zone1Coords
    },
    {
        id: 2,
        image: zone2,
        coords: zone2Coords
    },
    {
        id: 3,
        image: zone3,
        coords: zone3Coords
    },
    {
        id: 4,
        image: zone4,
        coords: zone4Coords
    }
]


const ParkingMap = () => {

    const [currentZoneIndex, setCurrentZoneIndex] = useState(0);

    const handlePress = () => {
        if (currentZoneIndex === zones.length - 1) {
            setCurrentZoneIndex(0);
        } else {
            setCurrentZoneIndex(currentZoneIndex + 1);
        }
    }

    return (
        <ThemedView style={styles.container}>
r            <TouchableOpacity
                onPress={handlePress}
            >
                <Image
                    source={zones[currentZoneIndex].image}
                    style={styles.image}
                />
                <ThemedText type={"defaultSemiBold"} style={styles.text}>Cambiar Zona</ThemedText>
            </TouchableOpacity>
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
    },
    image: {
        width: 300,
        height: 300
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 5,
    }
});

export default ParkingMap;

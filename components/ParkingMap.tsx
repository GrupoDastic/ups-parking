import {ThemedView} from "@/components/ThemedView";
import zone1Coords from '@/constants/image_coordinates_zone_1';
import zone2Coords from '@/constants/image_coordinates_zone_2';
import zone3Coords from '@/constants/image_coordinates_zone_3';
import zone4Coords from '@/constants/image_coordinates_zone_4';
import {useState} from "react";
import {Image} from "expo-image";
import {ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {GLView} from "expo-gl";

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
            <ThemedText type={"defaultSemiBold"}
                        style={styles.text__title}>Zona {zones[currentZoneIndex].id}</ThemedText>
            <TouchableOpacity
                onPress={handlePress}
            >
                <View style={styles.image__zone}>
                    <Image
                        source={zones[currentZoneIndex].image}
                        style={styles.image}
                    />
                    {
                        zones[currentZoneIndex].coords.map((spot) => (
                            <View key={spot.id_parqueadero}
                                  style={{
                                      ...styles.spot,
                                      top: spot.y,
                                      left: spot.x
                                  }}
                            />
                        ))
                    }
                </View>
                <ThemedText type="subtitle" style={styles.text}>Cambiar Zona</ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text__title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 30,
        marginBottom: 30,
    },
    text: {
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    image: {
        width: 345,
        height: 380,
    },
    image__zone: {
        position: 'relative',
        width: 345,
        height: 380,
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 5,
    },
    spot: {
        position: 'absolute',
        width: 5, // Tamaño del spot
        height: 5,
        backgroundColor: 'green', // Color del spot
        borderRadius: 10, // Hacerlo circular
    },
});

export default ParkingMap;

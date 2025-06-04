import React, {useState} from "react";
import {Modal, ScrollView, View,} from "react-native";
import logger from "@/utils/logger";
import {Gesture, GestureDetector, GestureHandlerRootView, RefreshControl,} from "react-native-gesture-handler";
import Animated, {useAnimatedStyle, useSharedValue, withSpring,} from "react-native-reanimated";
import ParkingLot from "@/components/ParkingLot";
import ThemedView from "@/components/shared/ThemedView";
import ThemedPressable from "@/components/shared/ThemedPressable";
import ThemedText from "@/components/shared/ThemedText";
import {useQuery} from "@tanstack/react-query";
import {getAvailableZonesStrips} from "@/services/parkingService";
import Spinner from "./ui/spinner/Spinner";
import ErrorPage from "@/components/ErrorPage";
import {useThemeColor} from "@/hooks/useThemeColor";
import {Ionicons} from "@expo/vector-icons";
import CircleDecoration from "@/components/ui/decoration/CircleDecoration";

interface ParkingZoneProps {
    id: string | string[];
    name?: string;
    identifier?: string;
}

const imageById = [
    {id: 1, image: require("@/assets/images/map/zone1.jpg")},
    {id: 2, image: require("@/assets/images/map/zone2.jpg")},
    {id: 3, image: require("@/assets/images/map/zone3.jpg")},
    {id: 4, image: require("@/assets/images/map/zone2.jpg")},
    {id: 5, image: require("@/assets/images/map/zone4.jpg")},
];

const ParkingZone = ({id, name, identifier}: ParkingZoneProps) => {
    const [strips, setStrips] = useState("1");
    const [modalVisible, setModalVisible] = useState(false);

    const backgroundColor = useThemeColor({}, "background");
    const borderColor = useThemeColor({}, "line");
    const primary = useThemeColor({}, "primary");
    const primaryContainer = useThemeColor({}, "primaryContainer");
    const textPrimary = useThemeColor({}, "text.primary");
    const onPrimary = useThemeColor({}, 'onPrimary');
    const outlineVariant = useThemeColor({}, "outlineVariant");

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scaleImage = useSharedValue(1);
    const lastTranslateX = useSharedValue(0);
    const lastTranslateY = useSharedValue(0);

    const doubleTap = Gesture.Tap().numberOfTaps(2).onStart((event) => {
        if (scaleImage.value === 1) {
            scaleImage.value = 2;
            translateX.value = -event.absoluteX + 200;
            translateY.value = -event.absoluteY + 300;
        } else {
            scaleImage.value = 1;
            translateX.value = 0;
            translateY.value = 0;
        }
    });

    const panGesture = Gesture.Pan()
        .onStart(() => {
            lastTranslateX.value = translateX.value;
            lastTranslateY.value = translateY.value;
        })
        .onUpdate((event) => {
            if (scaleImage.value > 1) {
                translateX.value = lastTranslateX.value + event.translationX;
                translateY.value = lastTranslateY.value + event.translationY;
            }
        });

    const imageStyle = useAnimatedStyle(() => ({
        transform: [
            {translateX: withSpring(translateX.value)},
            {translateY: withSpring(translateY.value)},
            {scale: withSpring(scaleImage.value)},
        ],
    }));

    const stripsAvailable = useQuery({
        queryKey: ["strips", id],
        queryFn: () => getAvailableZonesStrips(id),
        refetchInterval: 5000,
    });

    if (stripsAvailable.isError) {
        return <ErrorPage onRetry={() => stripsAvailable.refetch()}/>;
    }

    const stripsData = stripsAvailable.data;
    const freeSpaces = stripsData?.strips[Number(strips) - 1]?.free_spaces;

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={stripsAvailable.isLoading}
                    onRefresh={() => stripsAvailable.refetch()}
                />
            }
        >
            <ThemedView className="items-center justify-center px-4">
                <CircleDecoration style={{top: 40, left: -100}}/>
                <CircleDecoration style={{bottom: -100, right: -80}}/>

                <View className="w-full p-4 rounded-xl my-2 shadow-md "
                      style={{
                          backgroundColor: onPrimary
                      }}
                >
                    <View className="w-full items-center px-4 mb-6">
                        <View
                            className="w-full p-4 rounded-2xl shadow-md items-center"
                            style={{backgroundColor: primaryContainer}}
                        >
                            <View className="p-2 rounded-full bg-white/30 mb-2">
                                <Ionicons name="location-outline" size={28} color={textPrimary}/>
                            </View>

                            <ThemedText
                                type="h4"
                                className="font-extrabold tracking-wide text-center"
                            >
                                Bloque {identifier}: {name}
                            </ThemedText>

                            <View
                                className="h-1.5 w-1/3 rounded-full mt-2"
                                style={{backgroundColor: primary}}
                            />
                        </View>
                    </View>


                    <View className="flex-row justify-between items-center">
                        <ThemedText type="h4" className="font-semibold">
                            Mapa de Parqueos
                        </ThemedText>
                        <ThemedPressable title="Ver mapa" icon="map" onPress={() => setModalVisible(true)}/>
                    </View>
                    <View className="border-b my-2 mb-4" style={{borderColor}}/>

                    {stripsAvailable.isLoading ? (
                        <Spinner text="Cargando franjas disponibles"/>
                    ) : (
                        <View className="mt-3 mb-4 items-center">
                            <ThemedText type="caption" className="text-center mb-2" style={{color: textPrimary}}>
                                Seleccione una franja para ver los parqueos disponibles
                            </ThemedText>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View className="flex-row gap-x-2 items-center justify-around ">
                                    {stripsData?.strips
                                        .sort((a, b) => Number(a.strip_identifier) - Number(b.strip_identifier))
                                        .map(({zone_id, strip_name, strip_identifier, free_spaces}) => (
                                        <ThemedPressable
                                            key={zone_id + "-" + strip_identifier}
                                            icon="map"
                                            size={16}
                                            title={`Franja ${strip_name}`}
                                            disabled={free_spaces === "0"}
                                            className={`rounded-lg px-3 py-2 ${free_spaces === "0" ? "opacity-50" : ""}`}
                                            isActive={strips === strip_identifier.toString()}
                                            onPress={() => setStrips(strip_identifier.toString())}
                                        />
                                    ))}
                                </View>
                            </ScrollView>
                        </View>
                    )}

                    {freeSpaces && (
                        <View
                            className=" mt-5 my-4 px-4 py-3 rounded-xl shadow-md flex-row items-center gap-x-2"
                            style={{backgroundColor: primaryContainer}}
                        >
                            <View className="flex-row items-center gap-x-2">
                                <Ionicons name="car-sport-outline" size={24} color={primary}/>
                                <ThemedText type="subtitle1" className="font-bold">
                                    Espacios disponibles:
                                </ThemedText>
                            </View>
                            <ThemedText type="h2">
                                {freeSpaces}
                            </ThemedText>
                        </View>
                    )}
                </View>


                <View
                    className="w-full p-4 rounded-2xl shadow-md mt-6 mb-8"
                    style={{ backgroundColor: outlineVariant }}
                >
                    <View className="w-full items-center px-4 mb-4">
                        <View
                            className="w-full p-4 rounded-2xl shadow-sm items-center"
                            style={{ backgroundColor: primaryContainer }}
                        >
                            <View className="p-2 rounded-full bg-white/30 mb-2">
                                <Ionicons name="navigate-circle-outline" size={28} color={textPrimary} />
                            </View>

                            <ThemedText
                                type="h4"
                                className="font-extrabold tracking-wide text-center"
                            >
                                Plano Interactivo
                            </ThemedText>

                            <View
                                className="h-1.5 w-1/3 rounded-full mt-2"
                                style={{ backgroundColor: primary }}
                            />

                            <ThemedText
                                type="caption"
                                className="text-center mt-2 mb-4"
                                style={{ color: textPrimary }}
                            >
                                Usa gestos para mover y ampliar el mapa
                            </ThemedText>
                        </View>
                    </View>

                    {/* Texto guía */}

                    {/* Contenedor del mapa */}
                    <View className="rounded-xl overflow-hidden shadow-md">
                        <ParkingLot id={id} strips={strips} />
                    </View>

                    {!stripsAvailable.isLoading && (
                        <ThemedPressable
                            className="mb-6 px-5 py-3 rounded-lg shadow-lg"
                            icon="car"
                            title={`Parquear en la zona ${id}, franja ${strips}`}
                            style={{backgroundColor: primary}}
                            onPress={() => logger.info("User initiated parking action", { zone: id, strip: strips })}
                        />
                    )}
                </View>


                <Modal visible={modalVisible} transparent animationType="fade">
                    <GestureHandlerRootView className="flex-1">
                        <View className="flex-1 justify-center items-center">
                            <View className="absolute inset-0" style={{backgroundColor: `${backgroundColor}90`}}/>
                            <ThemedView className="rounded-lg shadow-lg w-4/5 h-1/2 p-6" style={{borderWidth: 1}}>
                                <ThemedText type="caption" className="text-center mt-3 mb-3"
                                            style={{color: textPrimary}}>
                                    Toque dos veces para ampliar la imagen
                                </ThemedText>
                                <GestureDetector gesture={Gesture.Simultaneous(doubleTap, panGesture)}>
                                    <View className="flex-1 overflow-hidden rounded-lg">
                                        <Animated.Image
                                            source={imageById.find((image) => image.id === Number(id))?.image}
                                            className="w-full h-full"
                                            style={[imageStyle]}
                                            resizeMode="contain"
                                        />
                                    </View>
                                </GestureDetector>

                                <ThemedPressable
                                    title="Cerrar"
                                    className="rounded-lg w-3/4 mt-4 self-center mb-2"
                                    onPress={() => {
                                        scaleImage.value = 1;
                                        translateX.value = 0;
                                        translateY.value = 0;
                                        setModalVisible(false);
                                    }}
                                />
                            </ThemedView>
                        </View>
                    </GestureHandlerRootView>
                </Modal>
            </ThemedView>
        </ScrollView>
    );
};


export default ParkingZone;

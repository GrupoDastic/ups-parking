import React, {useState} from "react";
import {ImageSourcePropType, Modal, ScrollView, View} from "react-native";
import {Gesture, GestureDetector, GestureHandlerRootView, RefreshControl} from "react-native-gesture-handler";
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import ParkingLot from "@/components/ParkingLot";
import ThemedView from "@/components/shared/ThemedView";
import ThemedPressable from "@/components/shared/ThemedPressable";
import ThemedText from "@/components/shared/ThemedText";
import {useQuery} from "@tanstack/react-query";
import {getAvailableZonesStrips} from "@/services/parkingService";
import Spinner from "./ui/spinner/Spinner";
import ErrorPage from "@/components/ErrorPage";
import {useThemeColor} from "@/hooks/useThemeColor";

interface ParkingZoneProps {
    id: string | string[];
}

type ImageById = {
    id: number;
    image: ImageSourcePropType;
}

const imageById: ImageById[] = [
    {
        id: 1,
        image: require("@/assets/images/map/zone1.jpg") as ImageSourcePropType,
    },
    {
        id: 2,
        image: require("@/assets/images/map/zone2.jpg") as ImageSourcePropType,
    },
    {
        id: 3,
        image: require("@/assets/images/map/zone3.jpg") as ImageSourcePropType,
    },
    {
        id: 4,
        image: require("@/assets/images/map/zone2.jpg") as ImageSourcePropType,
    },
    {
        id: 5,
        image: require("@/assets/images/map/zone4.jpg") as ImageSourcePropType,
    }
]

const ParkingZone = ({id}: ParkingZoneProps) => {
    const [strips, setStrips] = useState("1");
    const [modalVisible, setModalVisible] = useState(false);

    const backgroundColor = useThemeColor({}, "background");
    const borderColor = useThemeColor({}, "line");
    const primary = useThemeColor({}, "primary");
    const primaryContainer = useThemeColor({}, "primaryContainer");
    const textPrimary = useThemeColor({}, "text.primary");

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scaleImage = useSharedValue(1);
    const lastTranslateX = useSharedValue(0);
    const lastTranslateY = useSharedValue(0);

    const doubleTap = Gesture.Tap().numberOfTaps(2).onStart((event) => {
        if (scaleImage.value === 1) {
            scaleImage.value = 2;

            const offsetX = event.absoluteX - 200; // Ajusta según el tamaño de la imagen
            const offsetY = event.absoluteY - 300;

            translateX.value = -offsetX;
            translateY.value = -offsetY;
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

    const imageStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: withSpring(translateX.value)},
                {translateY: withSpring(translateY.value)},
                {scale: withSpring(scaleImage.value)},
            ],
        };
    });

    const stripsAvailable = useQuery({
        queryKey: ["strips", id],
        queryFn: () => getAvailableZonesStrips(id),
        retry: true,
        retryDelay: 5000,
        refetchInterval: 5000,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchIntervalInBackground: true,
    });

    if (stripsAvailable.isError) {
        return <ErrorPage onRetry={() => stripsAvailable.refetch()}/>;
    }

    const stripsData = stripsAvailable.data;
    const freeSpaces = stripsData?.strips[Number(strips) - 1]?.free_spaces;

    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={stripsAvailable.isLoading}
                                            onRefresh={() => stripsAvailable.refetch()}/>}
        >
            <ThemedView className="items-center justify-center px-4">
                <View className="w-full items-center my-5">
                    <ThemedText type="h2" className="text-center font-bold" style={{color: textPrimary}}>
                        Zona de Parqueo {id}
                    </ThemedText>
                    <View className="border-b-2 w-1/2 mt-2" style={{borderColor}}/>
                </View>

                <View
                    className="w-full p-4 rounded-lg mt-2 mb-2"
                    style={{
                        shadowColor: "rgba(0, 0, 0, 0.2)",
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 1,
                        shadowRadius: 4,
                    }}
                >
                    <View className="flex-row justify-between items-center">
                        <ThemedText type="h4" className="font-semibold">
                            Mapa de Parqueos
                        </ThemedText>
                        <ThemedPressable title={"Ver mapa"} icon={"map"} onPress={() => setModalVisible(true)}/>
                    </View>

                    <View className="border-b my-2" style={{borderColor}}/>
                </View>

                {stripsAvailable.isLoading ? (
                    <Spinner text="Cargando franjas disponibles"/>
                ) : (
                    <>
                        <ThemedText type="caption" className="text-center mb-2" style={{color: textPrimary}}>
                            Seleccione una franja para ver los parqueos disponibles
                        </ThemedText>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View className="flex-row gap-x-2 items-center justify-around">
                                {stripsData?.strips.map(({zone_id, strip_name, strip_identifier}) => (
                                    <ThemedPressable
                                        key={zone_id + "-" + strip_identifier}
                                        icon={"map"}
                                        size={16}
                                        title={`Franja ${strip_name}`}
                                        className="px-3 py-2 rounded-lg shadow-md"
                                        style={{
                                            backgroundColor: primaryContainer,
                                        }}
                                        onPress={() => {
                                            setStrips(strip_identifier.toString());
                                        }}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    </>
                )}

                {freeSpaces && (
                    <ThemedText type="subtitle1" className="text-center font-bold mt-4" style={{color: primary}}>
                        Espacios disponibles: {freeSpaces}
                    </ThemedText>
                )}

                <ParkingLot id={id} strips={strips}/>

                {!stripsAvailable.isLoading && (
                    <ThemedPressable
                        className="mb-6 px-5 py-3 rounded-lg shadow-lg"
                        icon={"car"}
                        title={`Parquear en la zona ${id}, franja ${strips}`}
                        style={{
                            backgroundColor: primary,
                        }}
                        onPress={() => console.log("Parquear")}
                    />
                )}

                <Modal visible={modalVisible} transparent animationType="fade">
                    <GestureHandlerRootView className="flex-1">
                        <View className="flex-1 justify-center items-center">
                            {/* Fondo difuminado adaptado al tema */}
                            <View
                                className="absolute inset-0"
                                style={{
                                    backgroundColor: `${backgroundColor}90`, // Fondo semitransparente con opacidad del 50%
                                    filter: "blur(8px)", // Aplica difuminado
                                }}
                            />


                            <ThemedView
                                className="rounded-lg shadow-lg w-4/5 h-1/2 p-6"
                                style={{
                                    borderWidth: 1,
                                }}
                            >
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
                                    className="rounded-lg w-3/4 mt-4 self-center mb-2 mt-2"
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

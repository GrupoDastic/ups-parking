import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useRouter} from 'expo-router';
import {LinearGradient} from "expo-linear-gradient";
import ZoneCard from "@/components/ui/main/ZoneCard";
import SpeechRecognition from "@/components/SpeechRecognition";
import {Image} from "expo-image";
import ThemedText from "@/components/shared/ThemedText";
import {StatusBar} from "expo-status-bar";
import {Colors} from "@/constants/Colors";
import CircleDecoration from "@/components/ui/decoration/CircleDecoration";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getAvailableZones} from "@/services/parkingService";
import {Zones} from "@/types";
import Spinner from "@/components/ui/spinner/Spinner";
import ThemedPressable from "@/components/shared/ThemedPressable";
import {useThemeColor} from "@/hooks/useThemeColor";
import {RefreshControl} from 'react-native-gesture-handler';

const PrincipalScreen = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const backgroundColor = useThemeColor({}, 'background');
    const primary = useThemeColor({}, "primary");
    const primaryColor = Colors.light.primary;
    const secondaryColor = Colors.light.secondary;

    const zonesAvailable = useQuery({
        queryKey: ['zones'],
        queryFn: getAvailableZones,
        retry: true,
        retryDelay: 5000,
        staleTime: 3000,
        refetchInterval: 5000,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchIntervalInBackground: true,

    });

    if (zonesAvailable.isError) {
        queryClient.invalidateQueries({
            queryKey: ['zones'],
        })
    }

    const zones: Zones | undefined = zonesAvailable.data;

    const handleRetry = () => {
        queryClient.invalidateQueries({
            queryKey: ['zones'],
        })
        zonesAvailable.refetch().then()
    }


    return (
        <>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={zonesAvailable.isLoading}
                        onRefresh={() => zonesAvailable.refetch()}
                    />
                }
                contentContainerStyle={{flexGrow: 1}}>

                <StatusBar translucent backgroundColor={primaryColor} style="light"/>
                <LinearGradient
                    colors={[primaryColor, secondaryColor]}
                    className="flex-1 items-center justify-center relative"
                >
                    <View className="absolute inset-0 justify-center items-center">
                        <CircleDecoration
                            style={{top: 350, right: -100}}
                        />
                        <CircleDecoration
                            style={{top: 580, left: -50}}
                        />
                        <CircleDecoration
                            style={{top: 200, left: -150}}
                        />
                    </View>

                    <View className={"items-center justify-center mt-6"}>
                        <Image source={require("@/assets/images/ups-logo.png")} style={styles.logoImage}/>
                    </View>

                    {
                        zones?.zones.length === 0 && (
                            <ThemedText type="h3" className="mt-6">No hay zonas disponibles</ThemedText>
                        )
                    }

                    {
                        zonesAvailable.isLoading ? (
                                <Spinner text="Cargando..."/>
                            ) :
                            zonesAvailable.isError ? (
                                <>
                                    <ThemedText type="error" className="mt-6">Error al cargar las zonas</ThemedText>
                                    <ThemedPressable icon={"analytics"} title={"Reintentar"} onPress={handleRetry}
                                    />
                                </>
                            ) : (
                                <ScrollView className="w-full flex-1 " showsHorizontalScrollIndicator={false}
                                            horizontal>

                                    <View className="flex-row w-full justify-between mt-8 px-4 gap-x-2">

                                        {zones?.zones.map(({zone_id, zone_identifier, zone_name, available_spaces}) => (
                                            <TouchableOpacity
                                                key={zone_id}
                                                onPress={() => router.push(`/zones/${zone_id}`)}
                                                disabled={available_spaces === "0"}
                                                className={available_spaces === "0" ? "opacity-50" : ""}
                                            >
                                                <ZoneCard zoneIdentifier={zone_identifier} zoneName={zone_name} availableSpaces={available_spaces}
                                                />
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </ScrollView>
                            )
                    }


                    <Image
                        style={styles.carImage}
                        source={require('@/assets/images/main-car.png')}
                    />

                    <View className="w-4/5 rounded-xl p-4 mb-2 mt-3 mx-4 shadow-lg items-center"
                          style={{backgroundColor}}
                    >
                        <ThemedText type="h2">UPS Parking</ThemedText>
                        <ThemedText type="subtitle2" className="mt-2"
                                    style={{
                                        color: primary
                                    }}
                        >
                            ¡Parquea tu auto de manera fácil!
                        </ThemedText>
                    </View>

                    {
                        zonesAvailable.isLoading || zonesAvailable.isError ? (
                            <Spinner text="Cargando..."/>
                        ) : (
                            <SpeechRecognition className="mt-2 w-1/2"/>
                        )
                    }
                </LinearGradient>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    carImage: {
        width: 200,
        height: 330,
        marginTop: 10,
        marginBottom: 10,
        zIndex: 2,
    },
    logoImage: {
        width: 225,
        height: 65,
        zIndex: 2,
    },
});

export default PrincipalScreen;

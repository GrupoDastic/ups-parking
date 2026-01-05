/**
 * PrincipalScreen.tsx
 * --------------------------------------------------------------
 * Cards VERTICALES (una debajo de otra)
 * SIN FlatList horizontal
 * SIN conflictos de gestos
 * Totalmente estable
 * --------------------------------------------------------------
 */

import React, {memo, useMemo, useState} from "react";
import {
    View,
    RefreshControl,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from "react-native";
import Toast from "react-native-toast-message";
import {StatusBar} from "expo-status-bar";
import {useRouter} from "expo-router";
import {BlurView} from "expo-blur";
import {Image} from "expo-image";
import {useQuery} from "@tanstack/react-query";
import {Ionicons} from "@expo/vector-icons";

import {getAvailableZones} from "@/services/parkingService";
import {Zones} from "@/types";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useAppTheme} from "@/hooks/useAppTheme";

import ThemedText from "@/components/shared/ThemedText";
import ThemedPressable from "@/components/shared/ThemedPressable";
import VoiceButton from "@/components/VoiceButton";
import {Button} from "@/components/ui/button";
import {Card, CardTitle, CardDescription} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Skeleton} from "@/components/ui/skeleton";
import ZoneCard from "./ui/main/ZoneCard";

const ZONE_PRIORITY = ["B", "D", "C", "H", "E", "G"] as const;

const PrincipalScreen: React.FC = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const theme = useAppTheme();

    const [search, setSearch] = useState("");

    const showUnderConstructionToast = () => {
        Toast.show({
            type: "info",
            text1: "Función en construcción",
            text2: "Próximamente disponible",
        });
    };

    /* Fetch zones */
    const {data: zones, isLoading, isError, refetch} = useQuery<Zones, Error>({
        queryKey: ["zones"],
        queryFn: getAvailableZones,
        refetchInterval: 5000,
    });

    /* Filtering + ordering */
    const filteredZones = useMemo(() => {
        if (!zones?.zones) return [];
        return zones.zones
            .filter(
                (z) =>
                    z.zone_name.toLowerCase().includes(search.toLowerCase()) ||
                    z.zone_identifier.toLowerCase().includes(search.toLowerCase())
            )
            .sort(
                (a, b) =>
                    ZONE_PRIORITY.indexOf(a.zone_identifier) -
                    ZONE_PRIORITY.indexOf(b.zone_identifier)
            );
    }, [search, zones?.zones]);

    const totalFree = useMemo(
        () =>
            filteredZones.reduce(
                (acc, {available_spaces}) => acc + Number(available_spaces),
                0
            ),
        [filteredZones]
    );

    return (
        <View
            style={{
                flex: 1,
                position: "relative",
                paddingTop: insets.top,
                backgroundColor: theme.background,
            }}
        >
            <StatusBar translucent backgroundColor="transparent" style="auto"/>

            <ScrollView
                keyboardShouldPersistTaps="handled"
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={refetch}/>
                }
            >
                {/* LOGO */}
                <View className="items-center mt-2">
                    <Image
                        source={require("@/assets/images/ups-logo.png")}
                        style={{width: 240, height: 100}}
                        contentFit="contain"
                    />
                </View>

                {/* HERO */}
                <View className="w-[92%] self-center mt-4 rounded-3xl overflow-hidden">
                    <BlurView
                        intensity={40}
                        tint="default"
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            padding: 16,
                            borderWidth: 1,
                            borderColor: "rgba(255,255,255,0.15)",
                        }}
                    >
                        <Image
                            source={require("@/assets/images/icon.png")}
                            style={{width: 120, height: 150, marginRight: 8}}
                            contentFit="contain"
                        />
                        <View className="flex-1">
                            <View className="items-center mt-4 mb-6">
                                <View className="w-[90%] rounded-2xl overflow-hidden">
                                    <BlurView
                                        intensity={40}
                                        style={{
                                            padding: 16,
                                            borderWidth: 1,
                                            borderColor: "rgba(255,255,255,0.15)",
                                        }}
                                    >
                                        <ThemedText type="h4" className="text-white text-center">
                                            Espacios libres totales
                                        </ThemedText>

                                        <ThemedText
                                            type="h1"
                                            className="text-white text-center font-bold"
                                        >
                                            {isLoading ? "—" : totalFree}
                                        </ThemedText>
                                    </BlurView>
                                </View>
                            </View>

                        </View>
                    </BlurView>
                </View>

                {/* SEARCH */}
                <View className="px-4 mt-4">
                    <View className="overflow-hidden rounded-full">
                        <BlurView
                            intensity={30}
                            tint="default"
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                backgroundColor: "rgba(255,255,255,0.05)",
                            }}
                        >
                            <Ionicons name="search" size={20} color="white"/>
                            <TextInput
                                className="flex-1 ml-2 text-white"
                                placeholder="Buscar zona..."
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                value={search}
                                onChangeText={setSearch}
                            />
                        </BlurView>
                    </View>
                </View>

                {/* TITLE */}
                <View className="px-4 pt-4 pb-2">
                    <ThemedText type="subtitle1" className="text-white">
                        Zonas Disponibles
                    </ThemedText>
                </View>

                {/* LIST */}
                <View className="px-4">
                    {isLoading &&
                        Array.from({length: 4}).map((_, i) => (
                            <Card
                                key={i}
                                className="mb-3 bg-white/90 dark:bg-zinc-900/90"
                            >
                                <Skeleton className="h-5 w-24 mb-2"/>
                                <Skeleton className="h-4 w-full mb-2"/>
                                <Skeleton className="h-4 w-16"/>
                            </Card>
                        ))}

                    {!isLoading && isError && (
                        <Card className="bg-white/90 dark:bg-zinc-900/90">
                            <ThemedText className="text-center">
                                Error al cargar zonas
                            </ThemedText>
                            <Button title="Reintentar" onPress={refetch}/>
                        </Card>
                    )}

                    {!isLoading &&
                        !isError &&
                        filteredZones.map((item) => {
                            const isFull = item.available_spaces === "0";

                            return (
                                <TouchableOpacity
                                    key={item.zone_id}
                                    activeOpacity={0.85}
                                    disabled={isFull}
                                    onPress={() =>
                                        router.push({
                                            pathname: "/zones/[id]",
                                            params: {
                                                id: String(item.zone_id),
                                                name: item.zone_name,
                                                identifier: item.zone_identifier,
                                            },
                                        })
                                    }
                                >
                                    <ZoneCard
                                        zoneIdentifier={item.zone_identifier}
                                        zoneName={item.zone_name}
                                        availableSpaces={item.available_spaces}
                                    />
                                </TouchableOpacity>
                            );
                        })}

                    {!isLoading && !isError && filteredZones.length === 0 && (
                        <Card className="bg-white/90 dark:bg-zinc-900/90">
                            <ThemedText className="text-center">
                                No hay zonas que coincidan con la búsqueda
                            </ThemedText>
                        </Card>
                    )}
                </View>


            </ScrollView>
            <VoiceButton/>
        </View>
    );
};

export default memo(PrincipalScreen);

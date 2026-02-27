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
import {RefreshControl, ScrollView, TextInput, TouchableOpacity, View,} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useRouter} from "expo-router";
import {Image} from "expo-image";
import {useQuery} from "@tanstack/react-query";
import {Ionicons} from "@expo/vector-icons";

import {getAvailableZones} from "@/services/parkingService";
import {Zones} from "@/types";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useAppTheme} from "@/hooks/useAppTheme";

import ThemedText from "@/components/shared/ThemedText";
import VoiceButton from "@/components/VoiceButton";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import ZoneCard from "./ui/main/ZoneCard";
import {useColorScheme} from "nativewind";
import ThemedPressable from "@/components/shared/ThemedPressable";

const ZONE_PRIORITY = ["B", "D", "C", "H", "E", "G"] as const;

const PrincipalScreen: React.FC = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const theme = useAppTheme();
    const {colorScheme} = useColorScheme();

    const [search, setSearch] = useState("");

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
            }}
            className="bg-background"
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
                <View
                    className="rounded-3xl bg-surface border border-primary/10 mb-2"
                    style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 10 },
                        shadowRadius: 20,
                        shadowOpacity: 0.2,
                        elevation: 8,
                        marginLeft: 16,
                        marginRight: 16,
                    }}
                >
                    <View className="px-5 mt-4 mb-4">
                        <View className="flex-row items-center">
                            {/* Logo */}
                            <Image
                                source={require("@/assets/images/home.png")}
                                style={{width: 128, height: 128}}
                                contentFit="contain"
                            />

                            {/* Text */}
                            <View className="ml-4 flex-1">
                                <ThemedText type="h4" className="text-muted uppercase tracking-widest">
                                    Espacios libres
                                </ThemedText>

                                <ThemedText type="h3" className="mt-1 text-primary">
                                    {isLoading ? "—" : totalFree}
                                </ThemedText>

                                <ThemedText type="body1" className=" text-success mt-0.5">
                                    Disponibles en campus
                                </ThemedText>
                            </View>
                        </View>
                    </View>

                    {/* Accent divider */}
                </View>

                <View className="px-4 mt-5">
                    <View className="flex-row items-center rounded-full bg-muted/10 px-4 py-3">
                        <Ionicons
                            name="search"
                            size={18}
                            color={colorScheme === "dark" ? "rgb(156 163 175)" : "rgb(107 114 128)"}
                        />

                        <TextInput
                            className="flex-1 ml-3 text-foreground"
                            placeholder="Buscar zona..."
                            placeholderTextColor={colorScheme === "dark" ? "rgb(156 163 175)" : "rgb(107 114 128)"}
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                </View>

                {/* TITLE */}
                <View className="px-4 mb-4 mt-4 items-center">
                    <ThemedText type="h3" className="text-primary">
                        Zonas Disponibles
                    </ThemedText>
                </View>


                {/* LIST */}
                <View className="px-4">
                    {isLoading &&
                        Array.from({length: 4}).map((_, i) => (
                            <Card
                                key={i}
                                className="mb-3 bg-surface border border-primary/10"
                            >
                                <Skeleton className="h-5 w-24 mb-2"/>
                                <Skeleton className="h-8 w-full mb-2"/>
                                <Skeleton className="h-4 w-16"/>
                            </Card>
                        ))}

                    {!isLoading && isError && (
                        <Card className="bg-surface border border-error/20">
                            <ThemedText className="text-center ">
                                Error al cargar zonas
                            </ThemedText>
                            <ThemedPressable
                                title="Intentar de nuevo"
                                onPress={() => refetch()}
                            />
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
                                        totalSpaces={item.total_spaces}
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

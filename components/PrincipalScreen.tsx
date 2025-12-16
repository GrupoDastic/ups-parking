/**
 * PrincipalScreen.tsx
 * --------------------------------------------------------------
 * Versión SIN ANIMACIONES — totalmente estable y simple
 * Tailwind para todo lo posible
 * --------------------------------------------------------------
 */

import React, {memo, useEffect, useMemo, useState} from "react";
import {
    View,
    RefreshControl,
    TouchableOpacity,
    TextInput,
    ScrollView,
    FlatList,
    Pressable,
} from "react-native";
import Toast from "react-native-toast-message";
import {StatusBar} from "expo-status-bar";
import {useRouter} from "expo-router";
import {BlurView} from "expo-blur";
import {Image} from "expo-image";
import {useQuery} from "@tanstack/react-query";
import {Ionicons} from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import ZoneCard from "@/components/ui/main/ZoneCard";
import ZoneCardSkeleton from "@/components/ui/skeleton/ZoneCardSkeleton";
import ThemedText from "@/components/shared/ThemedText";
import ThemedPressable from "@/components/shared/ThemedPressable";
import VoiceButton from "@/components/VoiceButton";
import {getAvailableZones} from "@/services/parkingService";
import {Zones} from "@/types";
import AppSafeArea from "@/components/layout/AppSafeArea";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useAppTheme} from "@/hooks/useAppTheme";
import {Button} from "@/components/ui/button";
import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {AlertBanner} from "@/components/ui/alert";
import {ButtonGroup, ButtonGroupSeparator} from "@/components/ui/button-group";
import {Input} from "@/components/ui/input";
import {Item, ItemActions, ItemContent, ItemGroup, ItemMedia} from "@/components/ui/item";
import {Skeleton} from "@/components/ui/skeleton";

const ZONE_PRIORITY = ["B", "D", "C", "H", "E", "G"] as const;
const CARD_WIDTH = 160;
const CARD_SPACING = 8;

/* Section header */
const SectionHeader: React.FC<{ title: string }> = ({title}) => (
    <View className="px-4 pt-2 pb-1">
        <ThemedText type="subtitle1" className="text-on-surface">
            {title}
        </ThemedText>
    </View>
);

const PrincipalScreen: React.FC = () => {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const showUnderConstructionToast = () => {
        Toast.show({
            type: "destructive",
            position: "bottom",
            text1: "Eliminar reserva",
            text2: "Esta acción no se puede deshacer",
            props: {
                action: {
                    label: "Eliminar",
                    onPress: () => console.log("eliminado"),
                },
            },
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

    /* Render ZoneCard */
    const renderItem = ({item}: any) => (
        <View className="mr-2">
            <TouchableOpacity
                activeOpacity={0.85}
                disabled={item.available_spaces === "0"}
                onPress={() =>
                    router.push({
                        pathname: "/zones/[id]",
                        params: {
                            id: item.zone_id,
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
                    style={{width: CARD_WIDTH}}
                />
            </TouchableOpacity>
        </View>
    );

    const insets = useSafeAreaInsets();
    const theme = useAppTheme();

    /* Skeleton */
    const SkeletonRow = () => (
        <View className="flex-row px-4 mt-2">
            <ZoneCardSkeleton width={CARD_WIDTH} className="mr-4"/>
            <ZoneCardSkeleton width={CARD_WIDTH} className="mr-4"/>
            <ZoneCardSkeleton width={CARD_WIDTH}/>
        </View>
    );

    return (
        <View style={{paddingTop: insets.top, backgroundColor: theme.background, flex: 1}}>
            <StatusBar translucent backgroundColor="transparent" style="auto"/>

            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor="#FFF"/>
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
                            style={{ width: 120, height: 150, marginRight: 5 }}
                            contentFit="contain"
                        />
                        <View className="flex-1">
                            <ThemedText type="h2" className="text-center text-black dark:text-white">
                                Bienvenido a UPS Parking
                            </ThemedText>

                            <ThemedText
                                type="body2"
                                className="text-white/80 text-center mt-1"
                            >
                                Encuentra y reserva tu lugar en segundos.
                            </ThemedText>

                            <ThemedPressable
                                title="Explorar zonas"
                                icon="navigate"
                                className="mt-3"
                                onPress={showUnderConstructionToast}
                            />
                            <Button title={"Prueba"} />
                        </View>
                    </BlurView>
                </View>

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
                            <Ionicons name="search" size={20} color="white" />
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

                <SectionHeader title="Zonas disponibles" />


                {/* SUCCESS */}
                {!isLoading && !isError && (
                    <View className="flex-row px-4 mt-2">
                        {filteredZones.map((item) => (
                            <View key={item.zone_id} className="mr-3">
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    disabled={item.available_spaces === "0"}
                                    onPress={() =>
                                        router.push({
                                            pathname: "/zones/[id]",
                                            params: {
                                                id: item.zone_id,
                                                name: item.zone_name,
                                                identifier: item.zone_identifier,
                                            },
                                        })
                                    }
                                >
                                    <Card className="w-40">
                                        <Badge label="Libre" variant="success" icon="checkmark-circle" />
                                        <CardHeader>
                                            <View className="flex-row items-center gap-2">
                                                <Ionicons name="location-outline" size={14} color="#2563eb" />
                                                <CardTitle>
                                                    Bloque {item.zone_identifier}
                                                </CardTitle>
                                            </View>

                                            <CardAction>
                                                <Ionicons
                                                    name={
                                                        item.available_spaces === "0"
                                                            ? "close-circle"
                                                            : "checkmark-circle"
                                                    }
                                                    size={16}
                                                    color={
                                                        item.available_spaces === "0"
                                                            ? "#ef4444"
                                                            : "#22c55e"
                                                    }
                                                />
                                            </CardAction>
                                        </CardHeader>

                                        {/* CONTENT */}
                                        <CardContent>
                                            <CardDescription className="font-semibold">
                                                {item.zone_name}
                                            </CardDescription>
                                        </CardContent>

                                        {/* FOOTER */}
                                        <CardFooter>
                                            <CardDescription>
                                                {item.available_spaces === "0"
                                                    ? "Lleno"
                                                    : `${item.available_spaces} libres`}
                                            </CardDescription>
                                        </CardFooter>

                                    </Card>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}


                <View className="items-center mt-4">
                    <View className="w-[90%] rounded-2xl overflow-hidden">
                        <BlurView
                            intensity={40}
                            style={{
                                padding: 16,
                                borderWidth: 1,
                                borderColor: "rgba(255,255,255,0.15)",
                            }}
                        >
                            <ThemedText type="h4" className="text-on-surface text-center mb-1">
                                Espacios libres totales
                            </ThemedText>

                            <ThemedText type="h1" className="text-on-surface text-center">
                                {isLoading ? "—" : totalFree}
                            </ThemedText>
                        </BlurView>
                    </View>
                </View>
                <VoiceButton />
            </ScrollView>
        </View>
    );
};

export default memo(PrincipalScreen);

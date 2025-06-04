/**
 * PrincipalScreen.tsx
 * ------------------------------------------------------------------
 *  • Toast "En construcción" en cada botón
 *  • Resto de la UI unchanged
 */

import React, { memo, useMemo, useState } from "react";
import {
    View,
    Platform,
    RefreshControl,
    TouchableOpacity,
    FlatList,
    FlatListProps,
    StyleSheet,
    TextInput,
} from "react-native";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import Animated, {
    FadeIn,
    FadeInDown,
    useAnimatedStyle,
    withTiming,
    useSharedValue,
    useAnimatedProps,
    useAnimatedScrollHandler,
    interpolate,
} from "react-native-reanimated";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";

import ZoneCard from "@/components/ui/main/ZoneCard";
import ZoneCardSkeleton from "@/components/ui/skeleton/ZoneCardSkeleton";
import SpeechRecognition from "@/components/SpeechRecognition";
import ThemedText from "@/components/shared/ThemedText";
import ThemedPressable from "@/components/shared/ThemedPressable";
import CircleDecoration from "@/components/ui/decoration/CircleDecoration";

import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { getAvailableZones } from "@/services/parkingService";
import { Zones } from "@/types";

const ZONE_PRIORITY = ["B", "D", "C", "H", "E", "G"] as const;
const CARD_WIDTH = 160;
const CARD_SPACING = 8;
const CARD_HEIGHT = 130;

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

/* Tight section header */
const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 }}>
        <ThemedText type="subtitle1" className="text-white">
            {title}
        </ThemedText>
    </View>
);

const PrincipalScreen: React.FC = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");

    /* Helper toast */
    const showUnderConstructionToast = () => {
        Toast.show({
            type: "info",          // info | success | error
            position: "bottom",
            text1: "🚧 En construcción",
            text2: "Próximamente.",
            visibilityTime: 2000,
            autoHide: true,
            bottomOffset: 60,
            props: {},              // puedes pasar props custom si configuras tu propio layout
        });
    };

    /* Theme colors */
    const gradientStart = Colors.light.primary;
    const gradientEnd = "#7063FF";
    const primaryContainer = useThemeColor({}, "primaryContainer");
    const errorContainer = useThemeColor({}, "errorContainer");

    /* Fetch zones */
    const { data: zones, isLoading, isError, refetch } = useQuery<Zones, Error>({
        queryKey: ["zones"],
        queryFn: getAvailableZones,
        refetchInterval: 5000,
    });

    /* Filter + sort */
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
                (acc, { available_spaces }) => acc + Number(available_spaces),
                0
            ),
        [filteredZones]
    );

    /* Hero animation */
    const heroAnim = useAnimatedStyle(() => ({
        opacity: withTiming(isLoading ? 0 : 1, { duration: 550 }),
        transform: [{ translateY: withTiming(isLoading ? 60 : 0, { duration: 550 }) }],
    }));

    /* Parallax blur */
    const scrollX = useSharedValue(0);
    const blurProps = useAnimatedProps(() => ({
        intensity: interpolate(
            scrollX.value,
            [0, CARD_WIDTH * Math.max(filteredZones.length - 1, 1)],
            [50, 80],
            "clamp"
        ),
    }));
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => void (scrollX.value = e.contentOffset.x),
    });

    /* ZoneCard renderer */
    const renderItem = ({
                            item,
                            index,
                        }: {
        item: Zones["zones"][number];
        index: number;
    }) => (
        <Animated.View entering={FadeInDown.delay(index * 50)}>
            <View style={{ marginRight: CARD_SPACING }}>
                <TouchableOpacity
                    activeOpacity={0.85}
                    disabled={item.available_spaces === "0"}
                    onPress={() => router.push({
                            pathname: "/zones/[id]",
                            params: {
                                id: item.zone_id,
                                name: item.zone_name,
                                identifier: item.zone_identifier,
                            }
                        })
                    }
                >
                    <ZoneCard
                        zoneIdentifier={item.zone_identifier}
                        zoneName={item.zone_name}
                        availableSpaces={item.available_spaces}
                        style={{ width: CARD_WIDTH, paddingHorizontal: 20 }}
                    />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );

    const SkeletonRow = () => (
        <View style={{ flexDirection: "row", paddingHorizontal: 16, marginTop: 8 }}>
            <ZoneCardSkeleton width={CARD_WIDTH} className="mr-4" />
            <ZoneCardSkeleton width={CARD_WIDTH} className="mr-4" />
            <ZoneCardSkeleton width={CARD_WIDTH} />
        </View>
    );

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" style="auto" />

            <LinearGradient colors={[gradientStart, gradientEnd]} style={StyleSheet.absoluteFill} />
            <CircleDecoration style={{ top: 420, right: -120 }} />
            <CircleDecoration style={{ top: 100, left: -110 }} />

            <Animated.ScrollView
                style={{ flex: 1, paddingBottom: 48 }}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor="#FFF" />
                }
            >
                {/* LOGO */}
                <View style={{ alignItems: "center", marginTop: 6 }}>
                    <Image
                        source={require("@/assets/images/ups-logo.png")}
                        style={{ width: 240, height: 100 }}
                        contentFit="contain"
                    />
                </View>

                {/* HERO */}
                <Animated.View entering={FadeIn.duration(550)} style={heroAnim}>
                    <View
                        style={{
                            width: "92%",
                            alignSelf: "center",
                            marginTop: 16,
                            borderRadius: 24,
                            overflow: "hidden",
                        }}
                    >
                        <AnimatedBlurView
                            animatedProps={blurProps}
                            tint={Platform.OS === "ios" ? "light" : "default"}
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
                            <View style={{ flex: 1 }}>
                                <ThemedText type="h2" className="text-white text-center">
                                    Bienvenido a UPS Parking
                                </ThemedText>
                                <ThemedText type="body2" className="text-white/90 text-center mt-1">
                                    Encuentra y reserva tu lugar en segundos.
                                </ThemedText>
                                <TouchableOpacity onPress={showUnderConstructionToast}>
                                    <ThemedPressable icon="navigate" title="Explorar zonas" className="mt-2"/>
                                </TouchableOpacity>
                            </View>
                        </AnimatedBlurView>
                    </View>
                </Animated.View>

                {/* SEARCH BAR */}
                <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
                    <View style={{ overflow: "hidden", borderRadius: 999 }}>
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
                                style={{ flex: 1, marginLeft: 8, color: "white" }}
                                placeholder="Buscar zona..."
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                value={search}
                                onChangeText={setSearch}
                            />
                        </BlurView>
                    </View>
                </View>

                {/* ZONAS DISPONIBLES */}
                <SectionHeader title="Zonas disponibles" />

                {isLoading ? (
                    <SkeletonRow />
                ) : isError ? (
                    <View style={{ alignItems: "center", marginTop: 8 }}>
                        <ThemedText type="error" className="mb-1 text-white">
                            Error al cargar zonas
                        </ThemedText>
                        <TouchableOpacity onPress={showUnderConstructionToast}>
                            <ThemedPressable icon="refresh" title="Reintentar" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Animated.FlatList
                        data={filteredZones}
                        keyExtractor={(item) => item.zone_id.toString()}
                        renderItem={renderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={CARD_WIDTH + CARD_SPACING}
                        decelerationRate="fast"
                        onScroll={scrollHandler}
                        scrollEventThrottle={16}
                        onMomentumScrollEnd={() => Haptics.selectionAsync()}
                        contentContainerStyle={{ paddingHorizontal: 16, alignItems: "center" }}
                    />
                )}

                {/* TOTAL FREE CARD + VOICE BUTTON */}
                <Animated.View entering={FadeInDown.delay(200)} style={{ alignItems: "center", marginTop: 16 }}>
                    <View style={{ width: "90%", borderRadius: 16, overflow: "hidden" }}>
                        <BlurView
                            intensity={40}
                            style={{
                                padding: 16,
                                borderWidth: 1,
                                borderColor: "rgba(255,255,255,0.15)",
                            }}
                        >
                            <ThemedText type="h4" className="text-white text-center mb-1">
                                Espacios libres totales
                            </ThemedText>
                            <ThemedText type="h1" className="text-white text-center">
                                {isLoading ? "—" : totalFree}
                            </ThemedText>
                        </BlurView>
                    </View>

                    <View style={{ marginTop: 12, alignItems: "center" }}>
                        <ThemedText type="caption" className="text-white/75 mb-1">
                            Toca el botón para parquear con voz
                        </ThemedText>
                        <View style={{ height: 50, overflow: "hidden" }}>
                            <SpeechRecognition className="w-full h-full" />
                        </View>
                    </View>
                </Animated.View>

                {/* QUICK ACTIONS */}
                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 16, paddingHorizontal: 16 }}>
                    <View style={{ flex: 1, marginRight: 8, overflow: "hidden", borderRadius: 12 }}>
                        <BlurView
                            intensity={30}
                            tint={Platform.OS === "ios" ? "light" : "default"}
                            style={{
                                padding: 12,
                                alignItems: "center",
                                backgroundColor: "rgba(255,255,255,0.05)",
                            }}
                        >
                            <TouchableOpacity onPress={showUnderConstructionToast}>
                                <Ionicons name="map-outline" size={24} color="white" />
                                <ThemedText type="button" className="text-white mt-1">
                                    Ver mapa general
                                </ThemedText>
                            </TouchableOpacity>
                        </BlurView>
                    </View>
                    <View style={{ flex: 1, marginLeft: 8, overflow: "hidden", borderRadius: 12 }}>
                        <BlurView
                            intensity={30}
                            tint={Platform.OS === "ios" ? "light" : "default"}
                            style={{
                                padding: 12,
                                alignItems: "center",
                                backgroundColor: "rgba(255,255,255,0.05)",
                            }}
                        >
                            <TouchableOpacity onPress={showUnderConstructionToast}>
                                <Ionicons name="calendar-outline" size={24} color="white" />
                                <ThemedText type="button" className="text-white mt-1">
                                    Mis reservas
                                </ThemedText>
                            </TouchableOpacity>
                        </BlurView>
                    </View>
                </View>

                {/* FOOTER */}
                <View style={{ alignItems: "center", marginVertical: 24 }}>
                    <ThemedText type="caption" className="text-white/70">
                        © ImEcuadorian & UPS
                    </ThemedText>
                </View>
            </Animated.ScrollView>
        </>
    );
};

export default memo(PrincipalScreen);

import React, {forwardRef} from "react";
import {View} from "react-native";
import {useThemeColor} from "@/hooks/useThemeColor";
import {Feather} from "@expo/vector-icons";
import ThemedText from "@/components/shared/ThemedText";

type ZoneCardProps = {
    zoneIdentifier: string;
    zoneName: string;
    availableSpaces: string;
};

const ZoneCard = forwardRef<any, ZoneCardProps>(
    ({ zoneIdentifier, zoneName, availableSpaces }, ref) => {
        const textError = useThemeColor({}, "text.error");
        const textSuccess = useThemeColor({}, "text.success");
        const primary = useThemeColor({}, "primary");
        const secondary = useThemeColor({}, "secondary");
        const background = useThemeColor({}, "background");
        const borderColor = useThemeColor({}, "outlineVariant");
        const textPrimary = useThemeColor({}, "text.primary");

        return (
            <View
                ref={ref}
                className="p-3 rounded-lg shadow-md w-40 items-center"
                style={{
                    backgroundColor: background,
                    borderWidth: 1,
                    borderColor,
                }}
            >
                {/* Encabezado con Ícono */}
                <View className="flex-row items-center gap-x-1">
                    <Feather name="map-pin" size={14} color={primary} />
                    <ThemedText type="h6" className="font-bold" style={{ color: textPrimary }}>
                        Bloque {zoneIdentifier}
                    </ThemedText>
                </View>

                {/* Línea divisoria decorativa */}
                <View className="w-12 border-b my-1 opacity-90" style={{ borderColor }} />

                {/* Nombre de la Zona */}
                <ThemedText
                    type="body2"
                    className="text-center"
                    style={{ color: secondary }}
                >
                    {zoneName}
                </ThemedText>

                {/* Línea divisoria adicional */}
                <View className="w-16 border-b my-1 opacity-30" style={{ borderColor }} />

                {/* Disponibilidad (más compacta y con más espacio entre el ícono y texto) */}
                <View className="flex-row items-center mt-2 gap-2">
                    {availableSpaces === "0" ? (
                        <>
                            <Feather name="x-circle" size={12} color={textError} />
                            <ThemedText type="caption" className="text-xs font-semibold" style={{ color: textError }}>
                                ¡Lleno!
                            </ThemedText>
                        </>
                    ) : (
                        <>
                            <Feather name="check-circle" size={12} color={textSuccess} />
                            <ThemedText type="caption" className="text-xs font-semibold" style={{ color: textSuccess }}>
                                {availableSpaces} libres
                            </ThemedText>
                        </>
                    )}
                </View>

            </View>
        );
    }
);

export default ZoneCard;

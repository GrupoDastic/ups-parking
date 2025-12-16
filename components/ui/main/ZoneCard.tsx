import React, { forwardRef } from "react";
import {StyleProp, View, ViewStyle} from "react-native";
import { Feather } from "@expo/vector-icons";
import ThemedText from "@/components/shared/ThemedText";

export interface ZoneCardProps {
    zoneIdentifier: string;
    zoneName: string;
    availableSpaces: string;
    style?: StyleProp<ViewStyle>;
}

const ZoneCard = forwardRef(({ zoneIdentifier, zoneName, availableSpaces } : ZoneCardProps, ref) => {

    return (
        <View
            ref={ref}
            className="
        p-4 rounded-xl border shadow-md
        bg-white dark:bg-slate-900
        border-slate-200 dark:border-slate-700
      "
        >
            <View className="flex-row items-center gap-2 mb-1">
                <Feather name="map-pin" size={14} color={"#2563eb"} />
                <ThemedText className="font-semibold text-slate-900 dark:text-slate-100">
                    Bloque {zoneIdentifier}
                </ThemedText>
            </View>

            <ThemedText className="mb-3 text-slate-600 dark:text-slate-400">
                {zoneName}
            </ThemedText>

            <View className="flex-row items-center gap-2">
                <Feather
                    name={availableSpaces === "0" ? "x-circle" : "check-circle"}
                    size={14}
                    color={availableSpaces === "0" ? "#ef4444" : "#22c55e"}
                />
                <ThemedText
                    className={`font-medium ${
                        availableSpaces === "0"
                            ? "text-red-500"
                            : "text-green-500"
                    }`}
                >
                    {availableSpaces === "0"
                        ? "Lleno"
                        : `${availableSpaces} libres`}
                </ThemedText>
            </View>
        </View>
    );
});

export default ZoneCard;

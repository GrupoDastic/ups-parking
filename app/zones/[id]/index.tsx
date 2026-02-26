import React from 'react';
import {Stack, useLocalSearchParams} from 'expo-router';
import Animated, {FadeIn} from 'react-native-reanimated';
import ParkingZone from '@/components/ParkingArea';
import {useAppTheme} from "@/hooks/useAppTheme";

export default function ZoneDetails() {
    const theme = useAppTheme();
    const { name, identifier } = useLocalSearchParams<{
        name?: string;
        identifier?: string;
    }>();
    const backgroundColor = theme.surface;
    const textColor = theme.text.primary;

    const title = name ? `${name} (${identifier})` : `Zona ${identifier}`;

    return (
        <>
            <Stack.Screen
                options={{
                    title,
                    headerTintColor: textColor,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: backgroundColor
                    },
                }}
            />
            <Animated.View entering={FadeIn.duration(300)} className="flex-1">
                <ParkingZone />
            </Animated.View>
        </>
    );
}

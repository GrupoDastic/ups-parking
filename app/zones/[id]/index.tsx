import React from 'react';
import {Stack, useLocalSearchParams} from 'expo-router';
import Animated, {FadeIn} from 'react-native-reanimated';
import ParkingArea from '@/components/ParkingArea';

export default function ZoneDetails() {
    const { id, name, identifier } = useLocalSearchParams<{
        id: string;
        name?: string;
        identifier?: string;
    }>();

    const title = name ? `${name} (${identifier})` : `Zona ${identifier}`;

    return (
        <>
            <Stack.Screen
                options={{
                    title,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: 'rgba(30,30,30,0.4)', // fallback para Android
                    },
                }}
            />
            <Animated.View entering={FadeIn.duration(300)}>
                <ParkingArea
                    id={id}
                    name={name}
                    identifier={identifier}
                />
            </Animated.View>
        </>
    );
}

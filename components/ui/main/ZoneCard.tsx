import ThemedText from '@/components/shared/ThemedText';
import {View} from 'react-native';
import {useThemeColor} from '@/hooks/useThemeColor';
import React, {forwardRef} from 'react';
import Skeleton from 'expo-skeleton-loading'
import SkeletonLoading from "expo-skeleton-loading";
import Spinner from "@/components/ui/spinner/Spinner";

type ZoneCardProps = {
    zoneIdentifier: string;
    zoneName: string;
    availableSpaces: string;
};

const ZoneCard = forwardRef<any, ZoneCardProps>(({zoneIdentifier, zoneName, availableSpaces}, ref) => {

    const textError = useThemeColor({}, 'text.error');
    const textSuccess = useThemeColor({}, 'text.success');
    const backgroundColor = useThemeColor({}, 'background');
    const primary = useThemeColor({}, "primary");
    const borderColor = useThemeColor({}, 'line');

    return (
        <View
            ref={ref}
            className='p-4 rounded-lg shadow-md items-center justify-center'
            style={{backgroundColor}}
        >
            <ThemedText type='h6'>Bloque {zoneIdentifier}</ThemedText>
            <View className="border-b-2 w-1/2 mt-1" style={{borderColor}}/>
            <ThemedText type='body2'
                        className='mt-2 mb-2'
                        style={{
                            color: primary
                        }}
            >{zoneName}</ThemedText>
            {
                availableSpaces === '0' ?
                    <ThemedText type='caption' style={{color: textError}}>¡LLeno!</ThemedText> :
                    <ThemedText type='caption' style={{color: textSuccess}}>Disponibles: {availableSpaces}</ThemedText>
            }
        </View>
    );
});

export default ZoneCard;




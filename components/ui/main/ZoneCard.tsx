import ThemedText from '@/components/shared/ThemedText';
import {View} from 'react-native';
import {useThemeColor} from '@/hooks/useThemeColor';
import {forwardRef} from 'react';
import Skeleton from 'expo-skeleton-loading'
import SkeletonLoading from "expo-skeleton-loading";
import Spinner from "@/components/ui/spinner/Spinner";

type ZoneCardProps = {
    zoneName: string;
    availableSpaces: string;
};

const ZoneCard = forwardRef<any, ZoneCardProps>(({zoneName, availableSpaces}, ref) => {

    const textError = useThemeColor({}, 'text.error');
    const textSuccess = useThemeColor({}, 'text.success');
    const backgroundColor = useThemeColor({}, 'background');

    return (
        <View
            ref={ref}
            className='p-4 rounded-lg shadow-md items-center justify-center'
            style={{backgroundColor}}
        >
            <ThemedText type='h6'>Zona: {zoneName}</ThemedText>
            {
                availableSpaces === '0' ?
                    <ThemedText type='caption' style={{color: textError}}>¡LLeno!</ThemedText> :
                    <ThemedText type='caption' style={{color: textSuccess}}>Disponibles: {availableSpaces}</ThemedText>
            }
        </View>
    );
});

export default ZoneCard;




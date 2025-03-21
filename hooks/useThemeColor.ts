import {useColorScheme} from 'react-native';

import {Colors} from '@/constants/Colors';

export function useThemeColor<T extends keyof typeof Colors.light>(
    props: { light?: string; dark?: string },
    colorName: T | `${T & string}.${string}`
): string {
    const theme = useColorScheme() ?? 'light';
    const colorFromProps = props[theme];

    if (colorFromProps) {
        return colorFromProps;
    }

    const color = colorName.split('.').reduce((obj, key) => {
        return obj && (obj)[key];
    }, Colors[theme] as any);

    return color as string;
}


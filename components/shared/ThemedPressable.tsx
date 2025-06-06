import {TouchableOpacity, TouchableOpacityProps, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import ThemedText from "@/components/shared/ThemedText";
import {useThemeColor} from "@/hooks/useThemeColor";

export interface ThemedPressableProps extends TouchableOpacityProps {
    title: string;
    className?: string;
    icon?: keyof typeof Ionicons.glyphMap;
    size?: number;
    isActive?: boolean;
}

const
    ThemedPressable = ({title, className, style, icon, size = 24, isActive = false, ...rest}: ThemedPressableProps) => {
    const secondaryColor = useThemeColor({}, 'secondary');
    const surfaceVariant = useThemeColor({}, 'surfaceVariant');

    return (
        <TouchableOpacity
            activeOpacity={0.7} // 🔥 Ajusta la opacidad al presionar
            className={[
                isActive ? 'bg-light-surfaceVariant dark:bg-dark-surfaceVariant' : 'bg-light-onPrimaryContainer',
                'p-2.5',
                'rounded-lg',
                'flex-row',
                'items-center',
                'justify-center',
                className,
            ].join(' ')}
            {...rest}
        >
            <View className='flex-row items-center justify-center space-x-2'>
                {icon && <Ionicons name={icon} size={size} color={secondaryColor} className="mr-3"/>}
                <ThemedText style={{
                    color: secondaryColor
                }} type={'button'}>{title}</ThemedText>
            </View>
        </TouchableOpacity>
    );
};

export default ThemedPressable;

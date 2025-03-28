import {View, ViewProps} from 'react-native';
import {useThemeColor} from "@/hooks/useThemeColor";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import React from "react";

interface ThemedViewProps extends ViewProps {
    flex?: boolean;
    className?: string;
    safe?: boolean;
    blur?: boolean;  // Propiedad booleana para habilitar el difuminado
}

const ThemedView = ({className, safe = false, children, style, blur = false, flex, ...rest}: ThemedViewProps) => {
    const backgroundColor = useThemeColor({}, 'background');
    const safeArea = useSafeAreaInsets();

    // Estilo para el difuminado
    const blurStyle = blur ? {
        backgroundColor: backgroundColor,
        filter: 'blur(10px)', // Aplica difuminado
    } : { backgroundColor };

    return (
        <View
            style={[
                {
                    flex: flex ? 1 : undefined,
                    paddingTop: safe ? safeArea.top : 0,
                    paddingBottom: safe ? safeArea.bottom : 0,
                    paddingLeft: safe ? safeArea.left : 0,
                    paddingRight: safe ? safeArea.right : 0,
                    ...blurStyle,  // Aplica el estilo con o sin difuminado
                },
                style,
            ]}
            className={className}
            {...rest}
        >
            {children}
        </View>
    );
};

export default ThemedView;

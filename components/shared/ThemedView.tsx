import React from "react";
import { View, ViewProps } from "react-native";

interface ThemedViewProps extends ViewProps {
    flex?: boolean;
    className?: string;
}

const ThemedView = ({
                        className,
                        children,
                        style,
                        flex,
                        ...rest
                    }: ThemedViewProps) => {
    return (
        <View
            className={className}
            {...rest}
        >
            {children}
        </View>
    );
};

export default ThemedView;

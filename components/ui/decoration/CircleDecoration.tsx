import React from "react";
import { View, ViewProps } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";

export interface CircleDecorationProps extends ViewProps {
    size?: number;
    opacity?: number;
}

const CircleDecoration: React.FC<CircleDecorationProps> = ({
                                                               size = 192,
                                                               opacity = 0.18,
                                                               style,
                                                               ...rest
                                                           }) => {
    const theme = useAppTheme();

    return (
        <View
            style={[
                {
                    position: "absolute",
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: theme.surfaceVariant,
                    opacity,
                },
                style,
            ]}
            {...rest}
        />
    );
};

export default React.memo(CircleDecoration);

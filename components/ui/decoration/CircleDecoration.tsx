import React from "react";
import { View, ViewProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

/** CircleDecoration
 *  Re‑usable blurred / translucent circle for background flair.
 */
export interface CircleDecorationProps extends ViewProps {
    /** Pixel diameter (default 192 ≈ 48×4). */
    size?: number;
    /** Background opacity (0 – 1). */
    opacity?: number;
}

const CircleDecoration: React.FC<CircleDecorationProps> = ({
                                                               size = 192,
                                                               opacity = 0.18,
                                                               style,
                                                               ...rest
                                                           }) => {
    const surfaceVariant = useThemeColor({}, "surfaceVariant");

    return (
        <View
            /* Absolute positioning comes from parent. */
            className="absolute"
            style={[
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: surfaceVariant,
                    opacity,
                },
                style,
            ]}
            {...rest}
        />
    );
};

export default React.memo(CircleDecoration);

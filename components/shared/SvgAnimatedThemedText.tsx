import { G, Rect, Text as SvgText } from "react-native-svg";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useState } from "react";
import {TextProps} from "react-native";
import {ParkingSpace} from "@/types";

export interface SvgThemedTextProps extends TextProps {
    x: number;
    y: number;
    fontSize?: string;
    rotate?: number;
    freeSpace?: boolean;
    onPress?: () => void;
    withBackground?: boolean;
    fontWeight?: string;
    onSpacePress?: (space: ParkingSpace) => void;
}

const SvgAnimatedThemedText = ({
                                   children,
                                   x,
                                   y,
                                   fontSize = "16",
                                   rotate = 0,
                                   freeSpace,
                                   onPress,
                                   withBackground = false,
                                   fontWeight,
                               }: SvgThemedTextProps) => {
    const theme = useAppTheme();
    const [pressed, setPressed] = useState(false);

    const handlePress = () => {
        setPressed(true);
        onPress?.();
        setTimeout(() => setPressed(false), 300);
    };

    return (
        <G transform={`rotate(${rotate}, ${x}, ${y})`} onPress={handlePress}>
            {withBackground && (
                <Rect
                    x={x - 35}
                    y={y - 20}
                    width={70}
                    height={40}
                    rx={6}
                    fill={pressed ? theme.secondary : theme.surface}
                />
            )}
            <SvgText
                x={x}
                y={y + 6}
                fill={pressed ? theme.accent : freeSpace ? theme.secondary : theme.primary}
                fontSize={fontSize}
                fontWeight={fontWeight}
                textAnchor="middle"
            >
                {children}
            </SvgText>
        </G>
    );
};

export default SvgAnimatedThemedText;

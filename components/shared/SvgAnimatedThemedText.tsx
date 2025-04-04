import { G, Rect, Text as SvgText } from "react-native-svg";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TextProps } from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/Colors";

export interface SvgThemedTextProps extends TextProps {
    x: number;
    y: number;
    fontSize?: string;
    textAnchor?: "start" | "middle" | "end";
    rotate?: number;
    freeSpace?: boolean;
    onPress?: () => void;
    withBackground?: boolean;
    fontWeight?: string;
    width?: number;
    height?: number;
    viewBox?: string;
}

const SvgAnimatedThemedText = ({
                                   children,
                                   x,
                                   y,
                                   fontSize = "16",
                                   textAnchor = "middle",
                                   rotate = 0,
                                   freeSpace,
                                   onPress,
                                   withBackground = false,
                                   fontWeight,
                               }: SvgThemedTextProps) => {
    const textColor = useThemeColor({}, "text.primary");
    const secondaryColor = useThemeColor({}, "secondary");
    const backgroundColor = Colors.light.onPrimaryContainer;

    const [pressed, setPressed] = useState(false);

    const handlePress = () => {
        setPressed(true);
        onPress?.();
        setTimeout(() => {
            setPressed(false);
        }, 300);
    };

    return (
        <G transform={`rotate(${rotate}, ${x}, ${y})`} onPress={handlePress}>
            {withBackground && (
                <Rect
                    x={x - 27}
                    y={y - 15}
                    width={70}
                    height={35}
                    rx={6}
                    fill={pressed ? "#FFC300" : backgroundColor}
                />
            )}
            <SvgText
                x={x + 7}
                y={y + 7}
                fontSize={fontSize}
                textAnchor={textAnchor}
                fontWeight={fontWeight}
                fill={pressed ? "#FF5733" : (freeSpace ? secondaryColor : textColor)}
            >
                {children}
            </SvgText>
        </G>
    );
};

export default SvgAnimatedThemedText;

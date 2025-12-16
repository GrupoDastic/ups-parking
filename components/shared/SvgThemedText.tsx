import { G, Text as SvgText } from "react-native-svg";
import { useAppTheme } from "@/hooks/useAppTheme";
import {TextProps} from "react-native";

export interface SvgThemedTextProps extends TextProps {
    x: number;
    y: number;
    fontSize?: string;
    fontWeight?: string;
    textAnchor?: "start" | "middle" | "end";
    rotate?: number;
}

const SvgThemedText = ({
                           children,
                           x,
                           y,
                           fontSize,
                           textAnchor,
                           rotate = 0,
                           fontWeight,
                       }: SvgThemedTextProps) => {
    const theme = useAppTheme();

    return (
        <G transform={`rotate(${rotate}, ${x}, ${y})`}>
            <SvgText
                x={x}
                y={y}
                fill={theme.text.primary}
                fontWeight={fontWeight}
                fontSize={fontSize}
                textAnchor={textAnchor}
            >
                {children}
            </SvgText>
        </G>
    );
};

export default SvgThemedText;

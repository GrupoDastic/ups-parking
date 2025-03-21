import Svg, { G, Text as SvgText } from "react-native-svg";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TextProps } from "react-native";

export interface SvgThemedTextProps extends TextProps {
    x: number;
    y: number;
    fontSize?: string;
    textAnchor?: "start" | "middle" | "end";
    rotate?: number;
}

const SvgThemedText = ({ children, x, y, fontSize, textAnchor, rotate = 0, ...rest }: SvgThemedTextProps) => {
    const textColor = useThemeColor({}, "text.primary");

    return (
        <Svg width="390" height="580" viewBox="0 0 390 580">
            <G transform={`rotate(${rotate}, ${x}, ${y})`}>
                <SvgText
                    x={x}
                    y={y}
                    fill={textColor}
                    fontSize={fontSize}
                    textAnchor={textAnchor}
                    {...rest}
                >
                    {children}
                </SvgText>
            </G>
        </Svg>
    );
};

export default SvgThemedText;

import Svg, {G, Text as SvgText, Rect} from "react-native-svg";
import {useThemeColor} from "@/hooks/useThemeColor";
import {TextProps, Pressable} from "react-native";
import {Colors} from "@/constants/Colors";
import Animated, {useSharedValue, useAnimatedProps, withTiming} from "react-native-reanimated";

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
}

const AnimatedSvgText = Animated.createAnimatedComponent(SvgText);
const AnimatedRect = Animated.createAnimatedComponent(Rect);

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
                           ...rest
                       }: SvgThemedTextProps) => {
    const textColor = useThemeColor({}, "text.primary");
    const secondaryColor = useThemeColor({}, "secondary");
    const backgroundColor = Colors.light.onPrimaryContainer;

    const textColorValue = useSharedValue(freeSpace ? secondaryColor : textColor);

    const backgroundColorValue = useSharedValue(backgroundColor);

    const handlePress = () => {
        textColorValue.value = withTiming("#FF5733", {duration: 200});
        backgroundColorValue.value = withTiming("#FFC300", {duration: 200});

        setTimeout(() => {
            textColorValue.value = withTiming(freeSpace ? secondaryColor : textColor, {duration: 200});
            backgroundColorValue.value = withTiming(backgroundColor, {duration: 200});
        }, 300);


    };

    const animatedTextProps = useAnimatedProps(() => ({
        fill: textColorValue.value,
    }));

    const animatedBackgroundProps = useAnimatedProps(() => ({
        fill: backgroundColorValue.value,
    }));

    return (
        <Svg width="390" height="580" viewBox="0 0 390 580">
            <G transform={`rotate(${rotate}, ${x}, ${y})`} onPress={handlePress}>
                {withBackground && (
                    <AnimatedRect
                        animatedProps={animatedBackgroundProps}
                        x={x - 27}
                        y={y - 15}
                        width={70}
                        height={35}
                        rx={6}
                    />
                )}
                <AnimatedSvgText
                    animatedProps={animatedTextProps}
                    x={x + 7}
                    y={y + 7}
                    fontSize={fontSize}
                    textAnchor={textAnchor}
                    fontWeight={fontWeight}
                    {...rest}
                >
                    {children}
                </AnimatedSvgText>
            </G>
        </Svg>
    );
};

export default SvgAnimatedThemedText;

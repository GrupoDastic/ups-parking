import React, { useEffect } from "react";
import { ViewStyle } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

export interface SkeletonProps {
    width: number;
    height: number;
    borderRadius?: number;
    className?: string; // extra tailwind utilities
}

/** Lightweight shimmering placeholder (writes after render) */
const Skeleton: React.FC<SkeletonProps> = ({
                                               width,
                                               height,
                                               borderRadius = 12,
                                               className,
                                           }) => {
    const shimmer = useSharedValue(0);

    useEffect(() => {
        shimmer.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 700 }),
                withTiming(0, { duration: 700 }),
            ),
            -1,
            false,
        );
    }, []);

    const rStyle = useAnimatedStyle<ViewStyle>(() => ({
        opacity: 0.4 + 0.4 * shimmer.value,
    }));

    return (
        <Animated.View
            className={`bg-white/10 ${className ?? ""}`}
            style={[{ width, height, borderRadius }, rStyle]}
        />
    );
};

export default React.memo(Skeleton);

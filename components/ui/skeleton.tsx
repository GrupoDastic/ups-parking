import React, { useEffect, useRef } from "react";
import { Animated, View, ViewProps } from "react-native";

const AnimatedView = Animated.createAnimatedComponent(View);

export function Skeleton({
                             style,
                             ...props
                         }: ViewProps) {
    const opacity = useRef(new Animated.Value(0.6)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.6,
                    duration: 700,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <AnimatedView
            style={[
                {
                    backgroundColor: "#e5e7eb", // neutral-300
                    borderRadius: 12,
                    opacity,
                },
                style,
            ]}
            {...props}
        />
    );
}

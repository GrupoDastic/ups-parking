import React from "react";
import Svg, { G, SvgXml } from "react-native-svg";
import { View } from "react-native";
import CarIcon from "@/components/icon/CarIcon";
import PregnantIcon from "@/components/icon/PregnantIcon";
import DisabledIcon from "@/components/icon/DisabledIcon";
import StripsIcon from "@/components/icon/StripsIcon";
import SvgAnimatedThemedText from "@/components/shared/SvgAnimatedThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import logger from "@/utils/logger";

interface ParkingSpace {
    id: string;
    identifier: string;
    type: string;
    status: string;
    position_x: number;
    position_y: number;
}

interface DynamicAreaBlockProps {
    svgContent: string;
    width: number;
    height: number;
    viewBox: string;
    parkingSpacesData?: ParkingSpace[];
}

const ParkingIcon = ({
                         type,
                         status,
                         x,
                         y,
                         viewBox,
                         width,
                         height,
                     }: {
    type: string;
    status: string;
    x: number;
    y: number;
    viewBox: string;
    width: number;
    height: number;
}) => {
    const commonProps = { x, y, viewBox, width, height };

    if (status === "occupied") return <CarIcon {...commonProps} />;
    if (type === "strips") return <StripsIcon {...commonProps} />;
    if (type === "pregnant") return <PregnantIcon {...commonProps} />;
    if (type === "disabled") return <DisabledIcon {...commonProps} />;
    return null;
};

const DynamicAreaBlockZoom = ({
                              svgContent,
                              width,
                              height,
                              viewBox,
                              parkingSpacesData,
                          }: DynamicAreaBlockProps) => {
    const backgroundColor = useThemeColor({}, "background");
    const lineColor = useThemeColor({}, "line");

    const cleanedSvgContent = svgContent
        .replace(/\$\$/g, "")
        .replace(
            /transform="matrix\((-?\d+\.?\d*) 0 0 (-?\d+\.?\d*) (\d+\.?\d*) (\d+\.?\d*)\)"/g,
            (_match, scaleX, scaleY, translateX, translateY) =>
                `transform="translate(${translateX}, ${translateY}) scale(${scaleX}, ${scaleY})"`
        )
        .replace(/stroke="#FFE208"/gi, `stroke="${lineColor}"`);

    const svgXml = `
    <svg width="${width}" height="${height}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${backgroundColor}" />
      ${cleanedSvgContent}
    </svg>
  `;

    // Zoom + pan shared values
    const scale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const lastX = useSharedValue(0);
    const lastY = useSharedValue(0);

    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = e.scale;
        });

    const panGesture = Gesture.Pan()
        .onStart(() => {
            lastX.value = translateX.value;
            lastY.value = translateY.value;
        })
        .onUpdate((e) => {
            translateX.value = lastX.value + e.translationX;
            translateY.value = lastY.value + e.translationY;
        });

    const gesture = Gesture.Simultaneous(pinchGesture, panGesture);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: withSpring(translateX.value) },
            { translateY: withSpring(translateY.value) },
            { scale: withSpring(scale.value) },
        ],
    }));

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[animatedStyle]} className="items-center justify-center mb-6 mt-6">
                <Svg width={width} height={height} viewBox={viewBox}>
                    <SvgXml xml={svgXml} width={width} height={height} />
                    <G>
                        {parkingSpacesData?.map(({ id, type, status, position_x, position_y }) => {
                            if (
                                position_x < 0 || position_x > width ||
                                position_y < 0 || position_y > height
                            ) return null;

                            return (
                                <ParkingIcon
                                    key={`icon-${id}`}
                                    type={type}
                                    status={status}
                                    x={position_x}
                                    y={position_y}
                                    viewBox={viewBox}
                                    width={width}
                                    height={height}
                                />
                            );
                        })}

                        {parkingSpacesData?.map(({ id, identifier, type, status, position_x, position_y }) => {
                            if (["strips", "pregnant", "disabled"].includes(type) || status === "occupied") return null;

                            const x = position_x > width / 2 ? position_x - 50 : position_x + 30;
                            const y = position_y > height / 2 ? position_y - 30 : position_y + 25;

                            return (
                                <SvgAnimatedThemedText
                                    key={`text-${id}`}
                                    x={x}
                                    y={y}
                                    fontSize="18"
                                    freeSpace
                                    withBackground
                                    fontWeight={"bold"}
                                    onPress={() => logger.debug(`Spot interaction`, { id, action: 'pressed' })}
                                >
                                    {identifier}
                                </SvgAnimatedThemedText>
                            );
                        })}
                    </G>
                </Svg>
            </Animated.View>
        </GestureDetector>
    );
};

export default DynamicAreaBlockZoom;

import React from "react";
import Svg, {G, SvgXml} from "react-native-svg";
import {View} from "react-native";
import CarIcon from "@/components/icon/CarIcon";
import PregnantIcon from "@/components/icon/PregnantIcon";
import DisabledIcon from "@/components/icon/DisabledIcon";
import StripsIcon from "@/components/icon/StripsIcon";
import SvgAnimatedThemedText from "@/components/shared/SvgAnimatedThemedText";
import {useThemeColor} from "@/hooks/useThemeColor";

interface ParkingSpace {
    id: string;
    identifier: string;
    type: string;
    status: string;
    position_x: number;
    position_y: number;
    orientation: string;
}

interface DynamicAreaBlockProps {
    svgContent: string;
    width: number;
    height: number;
    viewBox: string;
    parkingSpacesData?: ParkingSpace[];
}

// Subcomponente para renderizar íconos
const ParkingIcon = ({
                         type,
                         status,
                         x,
                         y,
                         viewBox,
                         width,
                         height,
                         rotate,
                     }: {
    type: string;
    status: string;
    x: number;
    y: number;
    viewBox: string;
    width: number;
    height: number;
    rotate?: number;
}) => {
    const commonProps = {x, y, viewBox, width, height, rotate};

    // Use a more declarative approach with a switch statement
    switch (true) {
        case status === "occupied":
            return <CarIcon {...commonProps} />;
        case type === "strips":
            return <StripsIcon {...commonProps} />;
        case type === "pregnant":
            return <PregnantIcon {...commonProps} />;
        case type === "disabled":
            return <DisabledIcon {...commonProps} />;
        default:
            return null;
    }
};

const DynamicAreaBlock = ({
                              svgContent,
                              width,
                              height,
                              viewBox,
                              parkingSpacesData,
                          }: DynamicAreaBlockProps) => {

    const lineColor = useThemeColor({}, "line");

    let cleanedSvgContent = svgContent
        .replace(/\$\$/g, "")
        // We're keeping the rect elements with fill attributes as they're needed for the SVG rendering
        .replace(
            /transform="matrix\((-?\d+\.?\d*) 0 0 (-?\d+\.?\d*) (\d+\.?\d*) (\d+\.?\d*)\)"/g,
            (_match, scaleX, scaleY, translateX, translateY) =>
                `transform="translate(${translateX}, ${translateY}) scale(${scaleX}, ${scaleY})"`
        )
        .replace(/stroke="#FFE208"/gi, `stroke="${lineColor}"`);

    const svgXml = `
        <svg width="${width}" height="${height}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">
            ${cleanedSvgContent}
        </svg>
    `;

    const getRotation = (orientation: string, x: number, width: number): number => {
        if (orientation === "vertical") return 90;
        if (x > width / 2) return 180;
        return 0;
    };

    const getAdjustedPosition = (type: string, status: string, position: number, offset: number): number => {
        // Make the operator precedence explicit with parentheses
        if (type === "disabled" || (type === "pregnant" && status === "occupied")) {
            return position + offset;
        }
        return position;
    };

    const shouldSkipTextRendering = (type: string, status: string): boolean => {
        // Skip text rendering for special types or occupied spaces
        return ["strips", "pregnant", "disabled"].includes(type) || status === "occupied";
    };


    return (
        <View className="items-center justify-center mb-6 mt-6">
            <Svg width={width} height={height} viewBox={viewBox}>
                <G pointerEvents="none">
                    <SvgXml xml={svgXml} width={width} height={height}/>
                </G>

                <G pointerEvents="box-none">
                    {parkingSpacesData?.map(({id, type, status, position_x, position_y, orientation}) => {

                        return (
                            <ParkingIcon
                                key={`icon-${id}`}
                                type={type}
                                status={status}
                                x={getAdjustedPosition(type, status, position_x, 27)}
                                y={getAdjustedPosition(type, status, position_y, 22)}
                                viewBox={viewBox}
                                width={width}
                                height={height}
                                rotate={getRotation(orientation, position_x, width)}
                            />
                        );
                    })}
                </G>
                <G pointerEvents="box-none">
                    {parkingSpacesData?.map(({id, identifier, type, status, position_x, position_y, orientation}) => {
                        // Skip rendering text for special types or occupied spaces
                        if (shouldSkipTextRendering(type, status)) return null;

                        return (
                            <SvgAnimatedThemedText
                                key={`text-${id}`}
                                x={position_x}
                                y={position_y}
                                fontSize="18"
                                freeSpace
                                withBackground
                                fontWeight={"bold"}
                                rotate={orientation === "vertical" ? 270 : 0}
                                onPress={() => {/* Handle spot press event */}}
                            >
                                {identifier}
                            </SvgAnimatedThemedText>
                        );
                    })}
                </G>
            </Svg>
        </View>
    );
};

export default DynamicAreaBlock;

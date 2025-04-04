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
                     }: {
    type: string;
    status: string;
    x: number;
    y: number;
    viewBox: string;
    width: number;
    height: number;
}) => {
    const commonProps = {x, y, viewBox, width, height};

    if (status === "occupied") return <CarIcon {...commonProps} />;
    if (type === "strips") return <StripsIcon {...commonProps} />;
    if (type === "pregnant") return <PregnantIcon {...commonProps} />;
    if (type === "disabled") return <DisabledIcon {...commonProps} />;
    return null;
};

const DynamicAreaBlock = ({
                              svgContent,
                              width,
                              height,
                              viewBox,
                              parkingSpacesData,
                          }: DynamicAreaBlockProps) => {
    const backgroundColor = useThemeColor({}, "background");

    const lineColor = useThemeColor({}, "line");

    let cleanedSvgContent = svgContent
        .replace(/\$\$/g, "")
        .replace(/<rect[^>]*fill="[^"]*"[^>]*\/>/gi, "")
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

    return (
        <View className="items-center justify-center mb-6 mt-6">
            <Svg width={width} height={height} viewBox={viewBox}>
                <G pointerEvents="none">
                    <SvgXml xml={svgXml} width={width} height={height}/>
                </G>

                <G pointerEvents="box-none">
                    {parkingSpacesData?.map(({id, type, status, position_x, position_y}) => {
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
                </G>
                <G pointerEvents="box-none">
                    {parkingSpacesData?.map(({id, identifier, type, status, position_x, position_y}) => {
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
                                onPress={() => console.log(`Spot ${id} pressed`)}
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

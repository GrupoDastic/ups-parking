import React from "react";
import Svg, { G, SvgXml } from "react-native-svg";
import { View } from "react-native";
import CarIcon from "@/components/icon/CarIcon";
import PregnantIcon from "@/components/icon/PregnantIcon";
import DisabledIcon from "@/components/icon/DisabledIcon";
import StripsIcon from "@/components/icon/StripsIcon";
import SvgAnimatedThemedText from "@/components/shared/SvgAnimatedThemedText";
import { useAppTheme } from "@/hooks/useAppTheme";

interface ParkingSpace {
    id: string;
    identifier: string;
    type: string;
    status: string;
    position_x: number;
    position_y: number;
    orientation: string;
    rotation: number | null;
    coordinates: string | null;
}

interface DynamicAreaBlockProps {
    svgContent: string;
    width: number;
    height: number;
    viewBox: string;
    parkingSpacesData?: ParkingSpace[];
}

const ParkingIcon = ({ type, status, x, y, viewBox, width, height, rotate }: any) => {
    const commonProps = { x, y, viewBox, width, height, rotate };

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

    const theme = useAppTheme();
    const lineColor = theme.border;

    let cleanedSvgContent = svgContent
        .replace(/\$\$/g, "")
        .replace(
            /transform="matrix\((-?\d+\.?\d*) 0 0 (-?\d+\.?\d*) (\d+\.?\d*) (\d+\.?\d*)\)"/g,
            (_match, scaleX, scaleY, translateX, translateY) =>
                `transform="translate(${translateX}, ${translateY}) scale(${scaleX}, ${scaleY})"`
        )
        .replace(/stroke="#FFE208"/gi, `stroke="${lineColor}"`);

    const svgXml = `
        <svg width="${width}" height="${height}" viewBox="${viewBox}">
            ${cleanedSvgContent}
        </svg>
    `;

    const getRotation = (orientation: string, x: number, width: number, rotation: number | null): number => {
        if (orientation === "custom") return rotation ?? 0;
        if (orientation === "vertical") return 90;
        if (orientation === "horizontal" && x > width / 2) return 180;
        return 0;
    };

    const getRotationSvg = (orientation: string, rotation: number | null): number => {
        if (orientation === "vertical") return 270;
        if (orientation === "custom") return rotation ?? 0;
        return 0;
    };

    const getAdjustedPosition = (type: string, status: string, position: number, offset: number): number => {
        if (type === "disabled" || (type === "pregnant" && status === "occupied")) {
            return position + offset;
        }
        return position;
    };

    const shouldSkipTextRendering = (type: string, status: string): boolean =>
        ["strips", "pregnant", "disabled"].includes(type) || status === "occupied";

    return (
        <View className="items-center justify-center mb-6 mt-6">
            <Svg width={width} height={height} viewBox={viewBox}>
                <G pointerEvents="none">
                    <SvgXml xml={svgXml} width={width} height={height} />
                </G>

                <G pointerEvents="box-none">
                    {parkingSpacesData?.map(p => (
                        <ParkingIcon
                            key={`icon-${p.id}`}
                            {...p}
                            x={getAdjustedPosition(p.type, p.status, p.position_x, 27)}
                            y={getAdjustedPosition(p.type, p.status, p.position_y, 22)}
                            rotate={getRotation(p.orientation, p.position_x, width, p.rotation)}
                            viewBox={viewBox}
                            width={width}
                            height={height}
                        />
                    ))}
                </G>

                <G pointerEvents="box-none">
                    {parkingSpacesData?.map(p => {
                        if (shouldSkipTextRendering(p.type, p.status)) return null;

                        return (
                            <SvgAnimatedThemedText
                                key={`text-${p.id}`}
                                x={p.position_x}
                                y={p.position_y}
                                fontSize="18"
                                freeSpace
                                withBackground
                                fontWeight="bold"
                                rotate={getRotationSvg(p.orientation, p.rotation)}
                            >
                                {p.identifier}
                            </SvgAnimatedThemedText>
                        );
                    })}
                </G>
            </Svg>
        </View>
    );
};

export default DynamicAreaBlock;

import {View} from "react-native";
import Svg, {Line} from "react-native-svg";
import React from "react";
import {useThemeColor} from "@/hooks/useThemeColor";
import CarIcon from "@/components/icon/CarIcon";
import PregnantIcon from "@/components/icon/PregnantIcon";
import DisabledIcon from "@/components/icon/DisabledIcon";
import StripsIcon from "@/components/icon/StripsIcon";
import SvgThemedText from "@/components/shared/SvgThemedText";
import ArrowIcon from "@/components/icon/ArrowIcon";
import {ParkingsSpaces} from "@/types";

interface AreaProps {
    parkingSpacesData: ParkingsSpaces | undefined;
    id: string,
    strips: string;
}

const END_X = 565;

const RIGHT_X = 42;
const LEFT_X = 252;
const Y_START = 15;
const INCREMENT_Y = 55;
const WIDTH = 96;
const HEIGHT = 50;

const TOTAL_SPOTS = 11

const parkingSpots = Array.from({length: TOTAL_SPOTS}, (_, i) => ({
    id: i + 1,
    y: Y_START + i * INCREMENT_Y,
    occupied: [5, 6, 7, 8, 10].includes(i + 1),
}));

const parkingSpots2 = Array.from({length: TOTAL_SPOTS}, (_, i) => ({
    id: i + 12,
    y: Y_START + i * INCREMENT_Y,
    occupied: [14, 16, 17, 19, 21].includes(i + 12),
}));

const Area = ({parkingSpacesData, id, strips}: AreaProps) => {
    const lineColor = useThemeColor({}, "line");

    return (
        <View className="items-center justify-center mb-6 mt-6">

            <Svg width="390" height="565" viewBox="0 0 390 580">
                <Line x1={RIGHT_X} y1={END_X} x2={RIGHT_X} y2={Y_START} stroke={lineColor} strokeWidth="4"
                      strokeDasharray="3 4"/>
                <Line x1={LEFT_X + WIDTH} y1={Y_START} x2={LEFT_X + WIDTH} y2={END_X} stroke={lineColor} strokeWidth="4"
                      strokeDasharray="3 4"/>

                <PregnantIcon x={RIGHT_X + WIDTH / 2 - 30} y={130}/>
                <DisabledIcon x={RIGHT_X + WIDTH / 2 - 30} y={75}/>
                <StripsIcon x={RIGHT_X + WIDTH / 2 - 47} y={17}/>
                <SvgThemedText fontSize="32" x={195} y={340} rotate={270}>
                    Franja {strips}
                </SvgThemedText>
                <ArrowIcon x={165} y={500}/>

                {
                    parkingSpots.map((spot) => (
                        <Line key={`line-${spot.id}`} x1={RIGHT_X} y1={spot.y} x2={RIGHT_X + WIDTH} y2={spot.y}
                              stroke={lineColor} strokeWidth="4"/>
                    ))
                }

                {
                    parkingSpots.slice(3, 11).map((spot) => (
                        <SvgThemedText key={`line-${spot.id}`} x={RIGHT_X + WIDTH / 2} y={spot.y + HEIGHT / 2 + 8}
                                       fontSize="16" textAnchor="middle">
                            {spot.id}
                        </SvgThemedText>
                    ))
                }

                {parkingSpots2.map((spot) => (
                    <Line key={`line-${spot.id}`} x1={LEFT_X} y1={spot.y} x2={LEFT_X + WIDTH} y2={spot.y}
                          stroke={lineColor} strokeWidth="4"/>
                ))}

                {parkingSpots2.slice(0, 10).map((spot) => (
                    <SvgThemedText key={`line-${spot.id}`} x={LEFT_X + WIDTH / 2} y={spot.y + HEIGHT / 2 + 8}
                                   fontSize="16" textAnchor="middle">
                        {spot.id}
                    </SvgThemedText>
                ))}

                {parkingSpots.map((spot) =>
                    spot.occupied ? <CarIcon key={`car-${spot.id}`} x={RIGHT_X + WIDTH / 2 - 40} y={spot.y}/> : null
                )}

                {parkingSpots2.map((spot) =>
                    spot.occupied ?
                        <CarIcon key={`car-${spot.id}`} x={LEFT_X + WIDTH / 2 + 40} y={spot.y} rotate/> : null
                )}
            </Svg>
        </View>
    );
};

export default Area;

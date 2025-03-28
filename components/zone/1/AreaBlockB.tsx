import {View} from "react-native";
import Svg, {Line} from "react-native-svg";
import React from "react";
import {useThemeColor} from "@/hooks/useThemeColor";
import CarIcon from "@/components/icon/CarIcon";
import PregnantIcon from "@/components/icon/PregnantIcon";
import DisabledIcon from "@/components/icon/DisabledIcon";
import StripsIcon from "@/components/icon/StripsIcon";
import SvgAnimatedThemedText from "@/components/shared/SvgAnimatedThemedText";
import ArrowIcon from "@/components/icon/ArrowIcon";
import {ParkingSpace, ParkingsSpaces} from "@/types";
import SvgThemedText from "@/components/shared/SvgThemedText";

interface AreaProps {
    parkingSpacesData: ParkingsSpaces | undefined;
    id: string | string[];
    strips: string;
}

const END_X = 565;

const RIGHT_X = 42;
const LEFT_X = 252;
const Y_START = 15;
const INCREMENT_Y = 55;
const WIDTH = 96;

const TOTAL_SPOTS = 11

const parkingSpots = Array.from({length: TOTAL_SPOTS}, (_, i) => ({
    id: i + 1,
    y: Y_START + i * INCREMENT_Y,
}));

const parkingSpots2 = Array.from({length: TOTAL_SPOTS}, (_, i) => ({
    id: i + 12,
    y: Y_START + i * INCREMENT_Y,
}));

const AreaBlockB = ({parkingSpacesData, id, strips}: AreaProps) => {
    const lineColor = useThemeColor({}, "line");

    const parkingSpotsData: ParkingSpace[] | undefined = parkingSpacesData?.parking_spaces;

    return (
        <View className="items-center justify-center mb-6 mt-6">

            <Svg width="390" height="565" viewBox="0 0 390 580">
                <Line x1={RIGHT_X} y1={END_X} x2={RIGHT_X} y2={Y_START} stroke={lineColor} strokeWidth="4"
                      strokeDasharray="3 4"/>
                <Line x1={LEFT_X + WIDTH} y1={Y_START} x2={LEFT_X + WIDTH} y2={END_X} stroke={lineColor} strokeWidth="4"
                      strokeDasharray="3 4"/>

                <SvgThemedText fontSize="40" x={205} y={340} rotate={270}
                                       fontWeight={"bold"}
                >
                    Franja {strips}
                </SvgThemedText>
                <ArrowIcon x={180} y={500}/>

                {
                    parkingSpots.map((spot) => (
                        <Line key={`line-${spot.id}`} x1={RIGHT_X} y1={spot.y} x2={RIGHT_X + WIDTH} y2={spot.y}
                              stroke={lineColor} strokeWidth="4"/>
                    ))
                }

                {parkingSpots2.map((spot) => (
                    <Line key={`line-${spot.id}`} x1={LEFT_X} y1={spot.y} x2={LEFT_X + WIDTH} y2={spot.y}
                          stroke={lineColor} strokeWidth="4"/>
                ))}


                {
                    parkingSpotsData?.map(({id, type, status, position_x, position_y}) => {

                            if (type === "strips" && status !== "occupied") {
                                return (
                                    <StripsIcon key={`strips-${id}`} x={position_x - 7} y={position_y + 2}/>
                                )
                            }

                            if (type === "pregnant" && status !== "occupied") {
                                return (
                                    <PregnantIcon key={`pregnant-${id}`} x={position_x + 10} y={position_y + 3}/>
                                )
                            }

                            if (type === "disabled" && status !== "occupied") {
                                return (
                                    <DisabledIcon key={`disabled-${id}`} x={position_x + 10} y={position_y + 6}/>
                                )
                            }

                            return (
                                status === "occupied" ?
                                    <CarIcon key={`car-${id}`} x={position_x} y={position_y}
                                             rotate={position_x > 200}/> : null
                            )
                        }
                    )
                }
                {
                    parkingSpotsData?.map(({id, identifier, type, status, position_x, position_y}) => {
                            if (type === "strips" || type === "pregnant" || type === "disabled") {
                                return null;
                            }
                            if (status === "occupied") {
                                return null;
                            }
                            if (position_x > 200) {
                                return (
                                    <SvgAnimatedThemedText key={`spot-${id}`} x={position_x - 50} y={position_y - 30} fontSize="18"
                                                           freeSpace withBackground
                                                           fontWeight={"bold"}
                                                           onPress={() => console.log(`Spot ${id} pressed`)}
                                    >
                                        {identifier}
                                    </SvgAnimatedThemedText>
                                )
                            }
                            return (
                                <SvgAnimatedThemedText key={`spot-${id}`} x={position_x + 30} y={position_y + 25} fontSize="18"
                                                       freeSpace withBackground
                                                       fontWeight={"bold"}
                                                       onPress={() => console.log(`Spot ${id} pressed`)}
                                >
                                    {identifier}
                                </SvgAnimatedThemedText>
                            )
                        }
                    )
                }

            </Svg>
        </View>
    );
};

export default AreaBlockB;

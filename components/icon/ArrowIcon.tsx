import * as React from "react"
import {G, Path, SvgProps} from "react-native-svg"
import {useThemeColor} from "@/hooks/useThemeColor";

interface ArrowIconProps extends SvgProps {
    x: number;
    y: number;
}

const ArrowIcon = ({x, y, width, height, viewBox, ...rest}: ArrowIconProps) => {

    const fillColor = useThemeColor({}, 'text.primary');

    return (
        <G transform={`translate(${x}, ${y})`} rest={rest}>
            <Path
                stroke={fillColor}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={5}
                d="M18 37.96v-35m0 0 15 13.125M18 2.96 3 16.085"
            />
        </G>
    )
}
export default ArrowIcon

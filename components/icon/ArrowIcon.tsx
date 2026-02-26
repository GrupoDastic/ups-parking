import * as React from "react"
import {G, Path, SvgProps} from "react-native-svg"
import {useAppTheme} from "@/hooks/useAppTheme";

interface ArrowIconProps extends SvgProps {
    x: number;
    y: number;
}

const ArrowIcon = ({x, y, width, height, viewBox, ...rest}: ArrowIconProps) => {

    const theme = useAppTheme();
    const fillColor = theme.primary;

    return (
        <G transform={`translate(${x}, ${y})`} {...rest}>
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

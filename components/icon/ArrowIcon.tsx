import * as React from "react"
import Svg, {SvgProps, Path, G} from "react-native-svg"
import {useThemeColor} from "@/hooks/useThemeColor";

interface ArrowIconProps extends SvgProps {
    x: number;
    y: number;
}

const ArrowIcon = ({x, y, ...rest}: ArrowIconProps) => {

    const fillColor = useThemeColor({}, 'text.primary');

    return (
        <Svg
            width="390" height="580" viewBox="0 0 390 580"
            {...rest}
        >
            <G transform={`translate(${x}, ${y})`}>
                <Path
                    stroke={fillColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={5}
                    d="M18 37.96v-35m0 0 15 13.125M18 2.96 3 16.085"
                />
            </G>
        </Svg>
    )
}
export default ArrowIcon

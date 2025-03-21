import * as React from "react"
import Svg, {SvgProps, G, Path, Defs, ClipPath} from "react-native-svg"

interface StripsIconProps extends SvgProps {
    x: number;
    y: number;
    rotate?: boolean;
}

const StripsIcon = ({x, y, rotate, ...props}: StripsIconProps) => (
    <Svg
        width="390" height="580" viewBox="0 0 390 580"
        {...props}
    >
        <G clipPath="url(#a)" transform={`translate(${x}, ${y}) ${rotate ? `rotate(180)` : ''}`}>
            <Path
                fill="#FF0"
                d="M66.777-21.962 47.025-37.867-38 30.6l19.752 15.906 85.025-68.468Z"
            />
            <Path
                fill="#000"
                d="M86.53-6.056 66.776-21.962l-85.025 68.468L1.504 62.41 86.53-6.056Z"
            />
            <Path
                fill="#FF0"
                d="M106.281 9.85 86.529-6.057 1.504 62.41l19.752 15.906 85.025-68.468Z"
            />
            <Path
                fill="#000"
                d="M126.033 25.755 106.281 9.849 21.256 78.317l19.752 15.906 85.025-68.468Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M95 0v51H0V0z"/>
            </ClipPath>
        </Defs>
    </Svg>
)
export default StripsIcon

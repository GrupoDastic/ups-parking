import * as React from "react"
import Svg, {SvgProps, Path, G} from "react-native-svg"
import {useThemeColor} from "@/hooks/useThemeColor";

interface DisabledIconProps extends SvgProps {
    x: number;
    y: number;
    rotate?: boolean;
}

const DisabledIcon = ({x, y, rotate, ...props}: DisabledIconProps) => {

    const fillColor = useThemeColor({}, 'text.primary');

    return (
        <Svg width="390" height="580" viewBox="0 0 390 580">
            <G transform={`translate(${x}, ${y}) ${rotate ? 'rotate(180)' : ''}`}>
                <Svg
                    width={55}
                    height={42}
                    {...props}
                >
                    <Path
                        fill={fillColor}
                        d="M4.564 24.838c-2.52 0-4.564-1.86-4.564-4.149 0-2.294 2.045-4.149 4.564-4.149 2.52 0 4.563 1.856 4.563 4.149 0 2.288-2.04 4.149-4.563 4.149Zm31.493-13.276c0 .913.817 1.659 1.826 1.659 7.423 0 13.466 5.49 13.466 12.238 0 6.75-6.04 12.24-13.466 12.24-7.426 0-13.463-5.49-13.463-12.24 0-.913-.818-1.66-1.826-1.66s-1.826.747-1.826 1.66c0 8.584 7.677 15.56 17.115 15.56C47.32 41.018 55 34.038 55 25.457c0-8.58-7.68-15.556-17.118-15.556-1.017 0-1.826.739-1.826 1.66ZM28.87 25.459c0-.458-.41-.83-.913-.83-.503 0-.913.372-.913.83 0 5.433 4.868 9.855 10.84 9.855 5.972 0 10.843-4.422 10.843-9.855 0-5.433-4.864-9.852-10.843-9.852-.507 0-.913.37-.913.83 0 .463.406.83.913.83 4.97 0 9.017 3.675 9.017 8.192 0 4.522-4.043 8.195-9.017 8.195-4.975 0-9.014-3.673-9.014-8.195Zm9.262-24.302c-.906.408-1.265 1.406-.824 2.224l.757 1.374-6.354 3.364c-.56.298-.902.843-.902 1.433v9.477H11.862c-1.007 0-1.825.74-1.825 1.66 0 .914.818 1.66 1.825 1.66h20.773c1.002 0 1.825-.746 1.825-1.66V10.505l6.92-3.664c.578-.304.906-.861.906-1.439 0-.246-.057-.5-.192-.738l-1.518-2.769c-.447-.816-1.546-1.147-2.444-.738Z"
                    />
                </Svg>
            </G>
        </Svg>
    )
}
export default DisabledIcon

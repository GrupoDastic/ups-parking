import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
import { useThemeColor } from "@/hooks/useThemeColor";
import {Colors} from "@/constants/Colors";
import {useTheme} from "@react-navigation/core";

interface CarIconProps extends SvgProps {
    x: number;
    y: number;
    rotate?: boolean;
    viewBox?: string;
    width?: number;
    height?: number;
}

const CarIcon = ({
                     x,
                     y,
                     rotate,
                     viewBox = "0 0 80 50",
                     width = 55,
                     height = 55,
                     ...props
                 }: CarIconProps) => {
    const theme = useTheme();

    const vehicleColors = Colors[theme.dark ? "dark" : "light"].vehicleColors;

    const randomColor = React.useMemo(() => {
        const index = Math.floor(Math.random() * vehicleColors.length);
        return vehicleColors[index];
    }, []);

    return (
        <Svg
            width={width}
            height={height}
            viewBox={viewBox}
            {...props}
        >
            <G transform={`translate(${x}, ${y}) ${rotate ? "rotate(180)" : ""}`}>
                <Path
                    fill={randomColor}
                    fillRule="evenodd"
                    stroke="#000"
                    strokeMiterlimit={22.926}
                    strokeWidth={0.5}
                    d="M63.695 7.728c-3.766.355-7.978.397-12.458.309-.008-2.202-.225-3.863-1.045-5.272-.463-.794-.981-1.341-1.898-1.667-.672-.22-1.158-.058-1.325.37-.286.722.042 3.62.24 4.546.085.396.2.725.365.87.098.089.218.16.36.217.614.238 1.319.037 1.888.515a.745.745 0 0 1 .251.395c-9.718-.233-20.605-.993-30.912-.46-6.781 0-11.134.16-15.301 6.956-4.068 6.634-3.94 18.869 1.313 24.84 4.567 5.19 7.924 4.861 13.988 4.861 10.991.87 21.017.194 30.882-.126a.754.754 0 0 1-.221.302c-.57.478-1.274.277-1.888.515a1.188 1.188 0 0 0-.36.216c-.164.146-.28.475-.364.87-.199.927-.527 3.825-.24 4.548.166.427.652.589 1.324.37.917-.327 1.435-.874 1.898-1.668.809-1.392 1.03-3.029 1.045-5.19 4.06-.12 8.097-.163 12.168-.002 25.17 1 21.596-38.325.29-36.315Zm14.197 11.14c-1.659-4.545-4.47-7.868-8.987-9.21 2.47 3.368 6.206 7.54 8.987 9.21Zm.653 14.263c-1.659 4.546-4.47 7.87-8.987 9.211 2.47-3.368 6.206-7.54 8.987-9.21ZM20.38 12.366l3.772 1.35c-1.306 8.607-1.206 17.56.023 24.698l-3.562 1.218c-4.522-9.629-5.014-17.18-.232-27.266Zm5.332 29.642c5.327.938 13.525.768 18.841-.318-7.44-2.023-11.64-1.562-18.84.318Zm18.006-29.82 7.373-1.654c8.98 7.26 8.36 23.741 0 30.932l-7.373-2.07c2.245-9.212 2.063-18.27 0-27.207ZM25.71 9.993c5.327-.938 13.525-.768 18.841.318-7.44 2.021-11.64 1.562-18.84-.318Z"
                    clipRule="evenodd"
                />
            </G>
        </Svg>
    );
};

export default CarIcon;

import * as React from "react";
import {Defs, G, Mask, Path, Rect, SvgProps} from "react-native-svg";

interface PregnantWithBackgroundProps extends SvgProps {
    x?: number;
    y?: number;
    rotate?: number;
}

const PregnantWithBackground = ({
                                    x = 0,
                                    y = 0,
                                    rotate,
                                    ...rest
                                }: PregnantWithBackgroundProps) => {
    return (
        <G
            fill="#fff"
            transform={`translate(${x}, ${y}) rotate(${rotate || 0})`} {...rest}
        >
            <Rect
                x={1}
                y={3}
                width={68}
                height={43}
                rx={9}
                fill="#4D89D2"
                stroke="#fff"
                strokeWidth={2}
            />

            {/* Mask to match SVG B's behavior */}
            <Defs>
                <Mask id="mask" x={5} y={0} width={55} height={50} maskUnits="userSpaceOnUse">
                    <Path fill="#fff" d="M5 0v50h55V0H5Z"/>
                </Mask>
            </Defs>

            {/* Pregnant icon inside the masked area */}
            <Path
                d="M20.469 28.125a5.854 5.854 0 0 0-1.159-3.472c-.755-1.028-1.83-1.83-3.085-2.302a7.515 7.515 0 0 0-3.973-.356 7.112 7.112 0 0 0-3.52 1.71c-.961.875-1.616 1.988-1.881 3.2a5.724 5.724 0 0 0 .391 3.612c.52 1.142 1.402 2.118 2.532 2.805a7.374 7.374 0 0 0 3.82 1.053c1.822-.002 3.57-.66 4.859-1.833 1.289-1.171 2.014-2.76 2.016-4.417Zm-10.313 0c0-.618.202-1.222.58-1.736a3.388 3.388 0 0 1 1.542-1.151 3.759 3.759 0 0 1 1.986-.178c.667.12 1.28.418 1.76.855.481.437.809.994.941 1.6a2.862 2.862 0 0 1-.195 1.806 3.21 3.21 0 0 1-1.266 1.402 3.686 3.686 0 0 1-1.91.527c-.912 0-1.785-.33-2.43-.916-.644-.586-1.007-1.38-1.008-2.209ZM32.003 15.434c-1.816 1.467-2.971 3.424-3.6 6.114l-6.215 2.422v8.635l19.643 2.551h6.138v-5.468H58.28v-9.375H47.97V12.5h-5.157c-4.83 0-8.366.96-10.81 2.934Zm12.528.191v7.813h10.313v3.125H44.53v5.468h-2.456l-16.45-2.136V26.03l5.838-2.274.154-.843c.439-2.392 1.287-4.026 2.67-5.144 1.785-1.442 4.574-2.144 8.526-2.144h1.718Z"/>
        </G>
    );
};

export default PregnantWithBackground;

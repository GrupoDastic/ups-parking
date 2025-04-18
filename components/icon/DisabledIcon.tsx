import * as React from "react";
import {Defs, G, Mask, Path, Rect, SvgProps} from "react-native-svg";

interface DisabledWithBackgroundProps extends SvgProps {
    x?: number;
    y?: number;
    rotate?: number;
}

const DisabledWithBackground = ({
                                    x = 0,
                                    y = 0,
                                    rotate,
                                    ...rest
                                }: DisabledWithBackgroundProps) => {

    return (

        <G
            transform={`translate(${x}, ${y}) rotate(${rotate || 0})`} rest={rest}
        >
            <Rect
                x={1}
                y={1}
                width={68}
                height={43}
                rx={9}
                fill="#4D89D2"
                stroke="#fff"
                strokeWidth={2}
            />

            {/* Máscara como en el segundo SVG */}
            <Defs>
                <Mask id="mask" x={0} y={0} width={70} height={45} maskUnits="userSpaceOnUse">
                    <Rect width={70} height={45} fill="#fff"/>
                </Mask>
            </Defs>

            {/* Ícono blanco encima, con posibilidad de mover y rotar */}

            <Path
                fill="#fff"
                d="M15.734 26.067c-2.061 0-3.734-1.487-3.734-3.316 0-1.833 1.673-3.316 3.734-3.316 2.063 0 3.734 1.484 3.734 3.316 0 1.83-1.669 3.316-3.734 3.316ZM41.5 15.457c0 .73.668 1.325 1.494 1.325 6.074 0 11.018 4.39 11.018 9.782 0 5.395-4.942 9.783-11.018 9.783-6.075 0-11.015-4.388-11.015-9.783 0-.73-.67-1.327-1.494-1.327-.825 0-1.494.597-1.494 1.327 0 6.86 6.281 12.436 14.003 12.436C50.716 39 57 33.422 57 26.563c0-6.857-6.283-12.433-14.005-12.433-.832 0-1.494.59-1.494 1.326Zm-5.88 11.107c0-.366-.337-.664-.748-.664-.41 0-.746.298-.746.664 0 4.343 3.982 7.877 8.868 7.877 4.887 0 8.872-3.535 8.872-7.877s-3.98-7.874-8.872-7.874c-.414 0-.746.295-.746.663 0 .37.332.663.746.663 4.066 0 7.378 2.938 7.378 6.548 0 3.614-3.308 6.55-7.378 6.55s-7.375-2.936-7.375-6.55ZM43.198 7.14c-.741.326-1.036 1.124-.674 1.778l.62 1.098-5.2 2.689c-.458.238-.738.674-.738 1.145v7.575H21.705c-.824 0-1.493.592-1.493 1.326 0 .731.669 1.327 1.493 1.327h16.996c.82 0 1.493-.596 1.493-1.327v-8.14l5.662-2.928c.473-.243.741-.688.741-1.15 0-.197-.046-.4-.157-.59L45.198 7.73c-.365-.652-1.264-.917-1.999-.59Z"
            />
        </G>
    );
};

export default DisabledWithBackground;

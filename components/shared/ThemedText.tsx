import React from "react";
import { Text, TextProps } from "react-native";

type TextType =
    | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    | "subtitle1" | "subtitle2"
    | "body1" | "body2"
    | "caption" | "button"
    | "overline" | "link"
    | "error";

export interface ThemedTextProps extends TextProps {
    className?: string;
    type?: TextType;
}

const variantClasses: Record<TextType, string> = {
    h1: "text-4xl font-poppins-bold",
    h2: "text-3xl font-poppins-bold",
    h3: "text-2xl font-poppins-bold",
    h4: "text-xl font-poppins-bold",
    h5: "text-lg font-poppins-bold",
    h6: "text-base font-poppins-bold",

    subtitle1: "text-lg font-poppins-medium",
    subtitle2: "text-base font-poppins-medium",

    body1: "text-base font-poppins-regular",
    body2: "text-sm font-poppins-regular",

    caption: "text-xs font-poppins-regular",
    button: "text-base font-poppins-medium",
    overline: "text-xs font-poppins-medium",
    link: "text-base font-poppins-medium underline",

    error: "text-sm font-poppins-bold text-error",
};

const ThemedText: React.FC<ThemedTextProps> = ({
                                                   className = "",
                                                   type = "body1",
                                                   children,
                                                   ...rest
                                               }) => {
    return (
        <Text
            className={`${variantClasses[type]} ${className}`}
            {...rest}
        >
            {children}
        </Text>
    );
};

export default React.memo(ThemedText);

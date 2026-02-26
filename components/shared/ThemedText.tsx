import React from "react";
import {Text, TextProps} from "react-native";

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
    /* Títulos institucionales */
    h1: "text-4xl font-gill-bold text-foreground",
    h2: "text-3xl font-gill-bold text-foreground",
    h3: "text-2xl font-gill-bold text-foreground",
    h4: "text-xl font-gill-bold text-foreground",
    h5: "text-lg font-gill-bold text-foreground",
    h6: "text-base font-gill-bold text-foreground",

    /* Subtítulos */
    subtitle1: "text-lg font-gill-medium text-foreground",
    subtitle2: "text-base font-gill-medium text-foreground",

    /* Cuerpo de texto */
    body1: "text-base font-gill-regular text-foreground",
    body2: "text-sm font-gill-regular text-foreground",

    /* Textos pequeños */
    caption: "text-xs font-gill-light text-muted",
    overline: "text-xs font-gill-regular uppercase text-muted",

    /* Interacciones */
    button: "text-base font-gill-bold text-white",
    link: "text-base font-gill-regular underline text-primary",

    /* Error */
    error: "text-sm font-gill-bold text-error",
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

import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { cn } from "@/lib/cn";

type InputSize = "sm" | "default" | "lg" | number;

export function Input({
                          className,
                          size = "default",
                          ...props
                      }: TextInputProps & {
    className?: string;
    size?: InputSize;
}) {
    return (
        <TextInput
            className={cn(
                "w-full rounded-lg border border-border bg-background text-foreground px-3 py-2",
                size === "sm" && "px-2 py-1 text-sm",
                size === "lg" && "px-4 py-3 text-lg",
                className
            )}
            placeholderTextColor="rgba(0,0,0,0.4)"
            {...props}
        />
    );
}


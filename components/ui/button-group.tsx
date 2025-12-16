import React from "react";
import { View, ViewProps } from "react-native";
import { cn } from "@/lib/cn";

type Orientation = "horizontal" | "vertical";

export function ButtonGroup({
                                className,
                                orientation = "horizontal",
                                ...props
                            }: ViewProps & {
    className?: string;
    orientation?: Orientation;
}) {
    return (
        <View
            className={cn(
                "flex",
                orientation === "horizontal" ? "flex-row" : "flex-col",
                className
            )}
            {...props}
        />
    );
}

export function ButtonGroupText({
                                    className,
                                    ...props
                                }: ViewProps & { className?: string }) {
    return (
        <View
            className={cn(
                "bg-muted border border-border rounded-md px-4 py-2 flex-row items-center gap-2",
                className
            )}
            {...props}
        />
    );
}

export function ButtonGroupSeparator({
                                         orientation = "vertical",
                                         className,
                                     }: {
    orientation?: "vertical" | "horizontal";
    className?: string;
}) {
    return (
        <View
            className={cn(
                "bg-border",
                orientation === "vertical" ? "w-px self-stretch" : "h-px w-full",
                className
            )}
        />
    );
}

import React from "react";
import { View, ViewProps } from "react-native";
import { cn } from "@/lib/cn";

export function ItemGroup({
                              className,
                              ...props
                          }: ViewProps & { className?: string }) {
    return (
        <View className={cn("flex flex-col", className)} {...props} />
    );
}

export function Item({
                         className,
                         variant = "default",
                         size = "default",
                         ...props
                     }: ViewProps & {
    className?: string;
    variant?: "default" | "outline" | "muted";
    size?: "default" | "sm";
}) {
    return (
        <View
            className={cn(
                "flex-row items-center rounded-md",
                variant === "outline" && "border border-border",
                variant === "muted" && "bg-muted/50",
                size === "default" && "p-4 gap-4",
                size === "sm" && "px-4 py-3 gap-2",
                className
            )}
            {...props}
        />
    );
}

export function ItemMedia({ className, ...props }: ViewProps & { className?: string }) {
    return <View className={cn("shrink-0", className)} {...props} />;
}

export function ItemContent({ className, ...props }: ViewProps & { className?: string }) {
    return <View className={cn("flex-1 gap-1", className)} {...props} />;
}

export function ItemActions({ className, ...props }: ViewProps & { className?: string }) {
    return <View className={cn("flex-row gap-2", className)} {...props} />;
}

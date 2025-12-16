import * as React from "react";
import { View, ViewProps } from "react-native";
import { cn } from "@/lib/cn";

export function Card({
                         className,
                         ...props
                     }: ViewProps & { className?: string }) {
    return (
        <View
            className={cn(
                "bg-surface rounded-xl border border-border p-6 shadow-sm",
                className
            )}
            {...props}
        />
    );
}


export function CardHeader({
                               className,
                               ...props
                           }: ViewProps & { className?: string }) {
    return (
        <View
            className={cn(
                "mb-4 flex-row items-start justify-between gap-2",
                className
            )}
            {...props}
        />
    );
}

import ThemedText from "@/components/shared/ThemedText";

export function CardTitle({
                              className,
                              ...props
                          }: React.ComponentProps<typeof ThemedText> & { className?: string }) {
    return (
        <ThemedText
            type="subtitle1"
            className={cn("text-foreground", className)}
            {...props}
        />
    );
}

export function CardDescription({
                                    className,
                                    ...props
                                }: React.ComponentProps<typeof ThemedText> & { className?: string }) {
    return (
        <ThemedText
            type="body2"
            className={cn("text-on-surface/70", className)}
            {...props}
        />
    );
}


export function CardAction({
                               className,
                               ...props
                           }: ViewProps & { className?: string }) {
    return (
        <View
            className={cn("self-start", className)}
            {...props}
        />
    );
}

export function CardContent({
                                className,
                                ...props
                            }: ViewProps & { className?: string }) {
    return (
        <View
            className={cn("py-2", className)}
            {...props}
        />
    );
}


export function CardFooter({
                               className,
                               ...props
                           }: ViewProps & { className?: string }) {
    return (
        <View
            className={cn(
                "mt-4 flex-row items-center justify-between",
                className
            )}
            {...props}
        />
    );
}


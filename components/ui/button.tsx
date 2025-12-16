import { Pressable, View } from "react-native";
import { cva } from "@/lib/cva";
import ThemedText from "@/components/shared/ThemedText";

const buttonVariants = cva(
    "px-4 py-2.5 rounded-lg flex-row items-center justify-center",
    {
        variants: {
            variant: {
                default: "bg-primary",
                outline: "border border-primary bg-transparent",
                ghost: "bg-transparent",
            },
            size: {
                sm: "py-2 px-3",
                md: "py-2.5 px-4",
                lg: "py-3 px-5",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    }
);

export function Button({
                           title,
                           variant,
                           size,
                           className,
                           ...props
                       }: any) {
    return (
        <Pressable
            className={`
        ${buttonVariants({ variant, size })}
        active:opacity-80
        ${className ?? ""}
      `}
            {...props}
        >
            <ThemedText className="text-on-primary font-medium">
                {title}
            </ThemedText>
        </Pressable>
    );
}

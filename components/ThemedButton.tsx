import {Button, ButtonProps} from "react-native";
import {useThemeColor} from "@/hooks/useThemeColor";

export type ThemedButtonProps = ButtonProps & {
    lightColor?: string;
    darkColor?: string;
    title: string;
};

export function ThemedButton({
                                 title,
                                 lightColor,
                                 darkColor,
                                 ...rest
                             }: ThemedButtonProps) {
    const color = useThemeColor({light: lightColor, dark: darkColor}, 'button');

    return (
        <Button
            color={color}
            title={title}
        />
    );
}

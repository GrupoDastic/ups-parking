import { Stack } from "expo-router";
import {useAppTheme} from "@/hooks/useAppTheme";

export default function ZoneLayout() {

    const theme = useAppTheme();
    const backgroundColor = theme.text.primary;

    return (
        <Stack
            screenOptions={{
                headerShown: true, // Mostrar cabecera solo en zonas
                animation: "fade_from_bottom", // opcional
            }}
        />
    );
}

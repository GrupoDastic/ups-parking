import { Stack } from "expo-router";

export default function ZoneLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true, // Mostrar cabecera solo en zonas
                headerTintColor: "#fff", // color del icono back
                animation: "fade_from_bottom", // opcional
            }}
        />
    );
}

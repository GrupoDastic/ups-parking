import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false, // Ocultar cabecera en las pestañas
                tabBarActiveTintColor: "#2A5EA7", // color activo
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopColor: "#ccc",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Inicio",
                    headerShown: false,
                    tabBarLabel: "Inicio",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="map"
                options={{
                    title: "Mapa",
                    tabBarLabel: "Mapa",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="map-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: "Mi Cuenta",
                    tabBarLabel: "Cuenta",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}

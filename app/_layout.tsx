import {useEffect} from "react";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";
import {useFonts} from "expo-font";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {StatusBar} from "expo-status-bar";
import {Stack} from "expo-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useColorScheme} from "react-native";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/components/ui/toast";
import {SafeAreaProvider} from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function RootLayout() {
    const scheme = useColorScheme();

    const [loaded] = useFonts({
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    });

    useEffect(() => {
        if (loaded) SplashScreen.hideAsync();
    }, [loaded]);

    if (!loaded) return null;

    return (
        <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
                <GestureHandlerRootView className={scheme === "dark" ? "dark flex-1" : "flex-1"}>
                    <StatusBar style={scheme === "dark" ? "light" : "dark"}/>
                    <Stack screenOptions={{headerShown: false}}/>
                    <Toast config={toastConfig}/>
                </GestureHandlerRootView>
            </SafeAreaProvider>
        </QueryClientProvider>
    );
}

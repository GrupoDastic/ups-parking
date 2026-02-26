import {useEffect} from "react";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";
import {useFonts} from "expo-font";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {StatusBar} from "expo-status-bar";
import {Stack} from "expo-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import {toastConfig} from "@/components/ui/toast";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {useColorScheme} from "nativewind";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function RootLayout() {
    const {colorScheme} = useColorScheme();

    const [loaded] = useFonts({
        "Gill-Sans": require("../assets/fonts/GillSans.otf"),
        "Gill-Sans-Medium": require("../assets/fonts/GillSans-Medium.otf"),
        "Gill-Sans-Bold": require("../assets/fonts/GillSans-Bold.otf"),
        "Gill-Sans-Italic": require("../assets/fonts/GillSans-Italic.otf"),
        "Gill-Sans-Light": require("../assets/fonts/GillSans-Light.otf"),
        "Gill-Sans-Condensed": require("../assets/fonts/GillSans-Condensed.otf"),
        "Gill-Sans-Condensed-Bold": require("../assets/fonts/GillSans-Condensed-Bold.otf"),
    });

    useEffect(() => {
        if (loaded) SplashScreen.hideAsync();
    }, [loaded]);

    if (!loaded) return null;

    return (
        <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
                    <GestureHandlerRootView className={colorScheme === "dark" ? "dark flex-1" : "flex-1"}>
                        <StatusBar style={colorScheme === "dark" ? "light" : "dark"}/>
                        <Stack screenOptions={{headerShown: false}}/>
                        <Toast config={toastConfig}/>
                    </GestureHandlerRootView>
            </SafeAreaProvider>
        </QueryClientProvider>
    );
}

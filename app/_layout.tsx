import {useEffect} from 'react';

import * as SplashScreen from 'expo-splash-screen';

import "../global.css";
import {useFonts} from "expo-font";
import {useThemeColor} from "@/hooks/useThemeColor";
import {useColorScheme} from "@/hooks/useColorScheme";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native";
import ThemedView from "@/components/shared/ThemedView";
import SpeechRecognition from "@/components/SpeechRecognition";
import {StatusBar} from "expo-status-bar";
import {Navigator, Slot} from "expo-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const RootLayout = () => {

    const backgroundColor = useThemeColor({}, 'background');
    const colorScheme = useColorScheme();

    const safeAreaInsets = useSafeAreaInsets();

    const [loaded] = useFonts({
        'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Extra-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
        'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    })

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={{flex: 1, backgroundColor}}>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    <View style={{
                        flex: 1, backgroundColor,
                        marginTop: safeAreaInsets.top,
                        marginBottom: safeAreaInsets.bottom,
                        marginLeft: safeAreaInsets.left,
                        marginRight: safeAreaInsets.right,
                    }}>
                        <StatusBar style={"auto"}/>
                        <Navigator>
                            <Slot/>
                        </Navigator>
                    </View>
                </ThemeProvider>
            </GestureHandlerRootView>
        </QueryClientProvider>
    );
}

export default RootLayout;


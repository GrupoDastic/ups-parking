import { useColorScheme } from "react-native";
import {Colors} from "@/theme/theme";

export type AppTheme = typeof Colors.light;

export function useAppTheme(): AppTheme {
    const scheme = useColorScheme();
    return Colors[scheme === "dark" ? "dark" : "light"];
}


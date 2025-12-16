import { useColorScheme } from "react-native";
import {colors} from "@/theme/tokens"

export function useAppTheme() {
    const scheme = useColorScheme() ?? "light";
    return colors[scheme];
}


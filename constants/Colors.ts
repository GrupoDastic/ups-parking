export const Colors = {
    light: {
        /* iOS accent blue */
        primary: "#0A84FF",
        onPrimary: "#FFFFFF",
        primaryContainer: "#D6E8FF",        // very light blue tint
        onPrimaryContainer: "#001E3C",

        /* Gold accent reused for secondary */
        secondary: "#F5CC4A",
        onSecondary: "#FFFFFF",
        secondaryContainer: "#FFE9AD",
        onSecondaryContainer: "#2B2000",

        /* Teal tertiary for success/info */
        tertiary: "#007D8C",
        onTertiary: "#FFFFFF",
        tertiaryContainer: "#C6F6FF",
        onTertiaryContainer: "#002026",

        error: "#FF3B30",
        onError: "#FFFFFF",
        errorContainer: "#FFDAD5",
        onErrorContainer: "#410002",

        background: "#F2F3F7",              // softer than pure white
        onBackground: "#1C1C1E",

        surface: "#FFFFFF",
        onSurface: "#1C1C1E",

        surfaceVariant: "#ECECEC",
        onSurfaceVariant: "#4C4C50",

        outline: "#777B80",
        outlineVariant: "#D1D1D6",
        shadow: "#000000",

        line: "#FFD800", // parking‑line yellow

        /* Elevation follows Material‑3 style but softened */
        elevation: {
            level0: "transparent",
            level1: "#F7F8FA",
            level2: "#F1F2F6",
            level3: "#E9ECF2",
            level4: "#E6E9F0",
            level5: "#E3E6EE",
        },

        text: {
            primary: "#1C1C1E",
            error: "#FF3B30",
            success: "#34C759",
        },

        vehicleColors: [
            "#FF453A", "#FF9F0A", "#FFD60A", "#32D74B", "#0A84FF", "#5E5CE6",
            "#BF5AF2", "#A2845E", "#000000", "#FFFFFF", "#8E8E93", "#C7C7CC",
            "#636366", "#64D2FF", "#FF375F", "#30D158", "#64A8FF", "#FF453A",
        ],
    },

    dark: {
        primary: "#0A84FF",
        onPrimary: "#00356E",
        primaryContainer: "#004B9F",
        onPrimaryContainer: "#D6E8FF",

        secondary: "#F5CC4A",
        onSecondary: "#3F2E00",
        secondaryContainer: "#614400",
        onSecondaryContainer: "#FFE9AD",

        tertiary: "#4FD8EB",
        onTertiary: "#00363D",
        tertiaryContainer: "#00505A",
        onTertiaryContainer: "#A2EEFA",

        error: "#FFB4AB",
        onError: "#690005",
        errorContainer: "#93000A",
        onErrorContainer: "#FFDAD5",

        background: "#1C1C1E",
        onBackground: "#E5E5EA",

        surface: "#1C1C1E",
        onSurface: "#E5E5EA",

        surfaceVariant: "#2C2C2E",
        onSurfaceVariant: "#9A9A9C",

        outline: "#8E8E93",
        outlineVariant: "#5E5E60",
        shadow: "#000000",

        line: "#FFFFFF",

        elevation: {
            level0: "transparent",
            level1: "#242426",
            level2: "#28282A",
            level3: "#2E2E30",
            level4: "#313133",
            level5: "#353537",
        },

        text: {
            primary: "#E5E5EA",
            error: "#FF453A",
            success: "#30D158",
        },

        vehicleColors: [
            "#FF453A", "#FF9F0A", "#FFD60A", "#30D158", "#0A84FF", "#5E5CE6",
            "#BF5AF2", "#A2845E", "#000000", "#FFFFFF", "#8E8E93", "#C7C7CC",
            "#636366", "#64D2FF", "#FF375F", "#30D158", "#64A8FF", "#FF453A",
        ],
    },
} as const;

export const lightColors = {
    background: "rgb(245, 247, 255)",
    surface: "rgb(255, 255, 255)",

    foreground: "rgb(20, 20, 20)",
    onSurface: "rgb(32, 32, 32)",

    primary: "rgb(50, 85, 255)",
    onPrimary: "rgb(255, 255, 255)",

    primaryContainer: "rgb(227, 235, 255)",
    onPrimaryContainer: "rgb(20, 40, 120)",

    error: "rgb(210, 30, 30)",
    onError: "rgb(255, 255, 255)",
};

export const darkColors = {
    background: "rgb(15, 18, 28)",
    surface: "rgb(25, 28, 40)",

    foreground: "rgb(230, 235, 255)",
    onSurface: "rgb(200, 205, 230)",

    primary: "rgb(120, 150, 255)",
    onPrimary: "rgb(0, 0, 0)",

    primaryContainer: "rgb(60, 75, 150)",
    onPrimaryContainer: "rgb(220, 230, 255)",

    error: "rgb(255, 90, 90)",
    onError: "rgb(0, 0, 0)",
};

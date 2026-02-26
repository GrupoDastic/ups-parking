
export interface ThemeColors {
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    onPrimaryContainer: string;
    secondary: string;
    onSecondary: string;
    accent: string;

    background: string;
    onBackground: string;

    surface: string;
    onSurface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;

    text: {
        primary: string;
        muted: string;
        success: string;
        error: string;
    };

    error: string;
    onError: string;
    success: string;

    outline: string;
    shadow: string;

    elevation: {
        level0: string;
        level1: string;
        level2: string;
        level3: string;
        level4: string;
        level5: string;
    };

    vehicleColors: string[];
    line: string;
}

interface ColorsType {
    light: ThemeColors,
    dark: ThemeColors
}

export const Colors: ColorsType = {
    /* ====================================================
       LIGHT MODE
    ==================================================== */
    light: {
        /* -------------------------
           BRAND – IDENTIDAD UPS
        ------------------------- */

        /** 🔵 Pantone 281 CVU
         * Color institucional principal
         * Headers, títulos, branding
         */
        primary: "rgb(0, 32, 91)", // #00205B
        onPrimary: "rgb(255, 255, 255)",

        /** Contenedores derivados */
        primaryContainer: "rgb(227, 235, 255)",
        onPrimaryContainer: "rgb(0, 32, 91)",

        /** 🟦 Azul digital UPS
         * Botones, tabs, acciones
         */
        secondary: "rgb(0, 101, 176)", // #0065B0
        onSecondary: "rgb(255, 255, 255)",

        /** 🟨 Pantone 130 CVU
         * Acentos, indicadores
         */
        accent: "rgb(242, 169, 0)", // #F2A900,

        /* -------------------------
           FONDOS (DIGITAL)
        ------------------------- */

        /** Fondo principal */
        background: "rgb(243, 247, 251)", // #F3F7FB
        onBackground: "rgb(64, 63, 59)",  // #403F3B

        /** Superficies (cards) */
        surface: "rgb(240, 240, 240)", // #F0F0F0
        onSurface: "rgb(32, 32, 32)",

        surfaceVariant: "rgb(236, 236, 236)",
        onSurfaceVariant: "rgb(76, 76, 80)",

        /* -------------------------
           TEXTOS
        ------------------------- */

        text: {
            primary: "rgb(64, 63, 59)",   // texto principal
            muted: "rgb(128, 125, 126)",  // texto secundario
            success: "rgb(22, 163, 74)",
            error: "rgb(210, 30, 30)",
        },

        /* -------------------------
           ESTADOS (NO identidad)
        ------------------------- */

        error: "rgb(210, 30, 30)",
        onError: "rgb(255, 255, 255)",

        success: "rgb(22, 163, 74)",

        /* -------------------------
           BORDES / SOMBRAS
        ------------------------- */

        outline: "rgb(209, 209, 214)",
        shadow: "rgb(0, 0, 0)",

        /* -------------------------
           ELEVATION (UI)
        ------------------------- */

        elevation: {
            level0: "transparent",
            level1: "rgb(247, 248, 250)",
            level2: "rgb(241, 242, 246)",
            level3: "rgb(233, 236, 242)",
            level4: "rgb(230, 233, 240)",
            level5: "rgb(227, 230, 238)",
        },

        vehicleColors: [
            "#FF453A", "#FF9F0A", "#FFD60A", "#32D74B", "#0A84FF", "#5E5CE6",
            "#BF5AF2", "#A2845E", "#000000", "#FFFFFF", "#8E8E93", "#C7C7CC",
            "#636366", "#64D2FF", "#FF375F", "#30D158", "#64A8FF", "#FF453A",
        ],

        line: "rgb(255,249,0)"
    },

    /* ====================================================
       DARK MODE
    ==================================================== */
    dark: {
        /* -------------------------
           BRAND – IDENTIDAD UPS
        ------------------------- */

        /** Se mantiene identidad,
         * pero ajustada a contraste
         */
        primary: "rgb(0, 101, 176)", // Azul digital UPS
        onPrimary: "rgb(255, 255, 255)",

        primaryContainer: "rgb(60, 75, 150)",
        onPrimaryContainer: "rgb(220, 230, 255)",

        secondary: "rgb(120, 150, 255)",
        onSecondary: "rgb(0, 0, 0)",

        accent: "rgb(242, 169, 0)",

        /* -------------------------
           FONDOS
        ------------------------- */

        background: "rgb(15, 18, 28)",   // #0F121C
        onBackground: "rgb(230, 235, 255)",

        surface: "rgb(25, 28, 40)",      // cards
        onSurface: "rgb(200, 205, 230)",

        surfaceVariant: "rgb(44, 44, 46)",
        onSurfaceVariant: "rgb(154, 154, 156)",

        /* -------------------------
           TEXTOS
        ------------------------- */

        text: {
            primary: "rgb(229, 231, 235)",
            muted: "rgb(180, 185, 200)",
            success: "rgb(74, 222, 128)",
            error: "rgb(255, 90, 90)",
        },

        /* -------------------------
           ESTADOS
        ------------------------- */

        error: "rgb(255, 90, 90)",
        onError: "rgb(0, 0, 0)",

        success: "rgb(74, 222, 128)",

        /* -------------------------
           BORDES / SOMBRAS
        ------------------------- */

        outline: "rgb(94, 94, 96)",
        shadow: "rgb(0, 0, 0)",

        /* -------------------------
           ELEVATION
        ------------------------- */

        elevation: {
            level0: "transparent",
            level1: "rgb(36, 36, 38)",
            level2: "rgb(40, 40, 42)",
            level3: "rgb(46, 46, 48)",
            level4: "rgb(49, 49, 51)",
            level5: "rgb(53, 53, 55)",
        },

        vehicleColors: [
            "#FF453A", "#FF9F0A", "#FFD60A", "#32D74B", "#0A84FF", "#5E5CE6",
            "#BF5AF2", "#A2845E", "#000000", "#FFFFFF", "#8E8E93", "#C7C7CC",
            "#636366", "#64D2FF", "#FF375F", "#30D158", "#64A8FF", "#FF453A",
        ],

        line: "rgb(255,253,0)"
    },
} as const;



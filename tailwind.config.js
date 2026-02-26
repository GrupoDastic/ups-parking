/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                background: "rgb(var(--color-background) / <alpha-value>)",
                surface: "rgb(var(--color-surface) / <alpha-value>)",

                foreground: "rgb(var(--color-foreground) / <alpha-value>)",
                muted: "rgb(var(--color-muted) / <alpha-value>)",

                primary: "rgb(var(--color-primary) / <alpha-value>)",
                secondary: "rgb(var(--color-secondary) / <alpha-value>)",
                accent: "rgb(var(--color-accent) / <alpha-value>)",

                success: "rgb(var(--color-success) / <alpha-value>)",
                error: "rgb(var(--color-error) / <alpha-value>)",

                surfaceVariant: "rgb(var(--color-surface-variant) / <alpha-value>)",
                text: {
                    DEFAULT: "rgb(var(--color-foreground) / <alpha-value>)",
                    muted: "rgb(var(--color-muted) / <alpha-value>)",
                    success: "rgb(var(--color-success) / <alpha-value>)",
                    error: "rgb(var(--color-error) / <alpha-value>)",
                },

                primaryContainer: "rgb(var(--color-primary) / 0.12)",
                secondaryContainer: "rgb(var(--color-secondary) / 0.12)",
            },
            fontFamily: {
                "gill": ["Gill-Sans", "sans-serif"],
                "gill-medium": ["Gill-Sans-Medium", "sans-serif"],
                "gill-bold": ["Gill-Sans-Bold", "sans-serif"],
                "gill-light": ["Gill-Sans-Light", "sans-serif"],
                "gill-italic": ["Gill-Sans-Italic", "sans-serif"],
                "gill-condensed": ["Gill-Sans-Condensed", "sans-serif"],
                "gill-condensed-bold": ["Gill-Sans-Condensed-Bold", "sans-serif"],
            },
        },
    },
};

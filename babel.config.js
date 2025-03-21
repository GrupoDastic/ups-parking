module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel", // Este es el preset de NativeWind
        ],
        plugins: [
            "react-native-reanimated/plugin", // Este es el plugin para react-native-reanimated
        ],
    };
};

// metro.config.cjs
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

const updatedConfig = withNativeWind(config, {
    input: './global.css',
});

updatedConfig.resolver = {
    ...updatedConfig.resolver,
    sourceExts: [...updatedConfig.resolver.sourceExts, "cjs"],
    assetExts: [
        ...updatedConfig.resolver.assetExts,
        "glb",
        "gltf",
    ],
};

module.exports = updatedConfig;

// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

const updatedConfig = withNativewind(config);

updatedConfig.resolver = {
    ...updatedConfig.resolver,
    sourceExts: [...updatedConfig.resolver.sourceExts, "cjs", "mjs"],
    assetExts: [
        ...updatedConfig.resolver.assetExts,
        "glb",
        "gltf",
        "png",
        "jpg",
    ],
};

module.exports = updatedConfig;

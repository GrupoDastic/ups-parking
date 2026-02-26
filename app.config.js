export default {
    expo: {
        name: "UPS Parking",
        slug: "UPS_Parking",
        version: "1.0.0",
        orientation: "portrait",
        scheme: "myapp",
        userInterfaceStyle: "automatic",

        icon: "./assets/images/icon.png",

        updates: {
            url: "https://u.expo.dev/6ebc7712-d3dd-4c2e-a871-43ebc60aab9e"
        },
        runtimeVersion: {
            policy: "appVersion"
        },

        assetBundlePatterns: ["**/*"],

        android: {
            package: "ec.edu.ups.dastic.parking",
            adaptiveIcon: {
                foregroundImage: "./assets/images/icon.png",
                backgroundColor: "#00205b",
            },
            permissions: ["android.permission.RECORD_AUDIO"],
        },

        ios: {
            supportsTablet: true,
            infoPlist: {
                NSSpeechRecognitionUsageDescription:
                    "Allow $(PRODUCT_NAME) to use speech recognition.",
                NSMicrophoneUsageDescription:
                    "Allow $(PRODUCT_NAME) to use the microphone.",
            },
        },

        web: {
            bundler: "metro",
            output: "static",
        },

        plugins: [
            "expo-router",
            [
                "expo-splash-screen",
                {
                    image: "./assets/images/splash-icon.png",
                    imageWidth: 200,
                    resizeMode: "contain",
                    backgroundColor: "#00205b",
                },
            ],
            [
                "expo-speech-recognition",
                {
                    microphonePermission:
                        "Allow $(PRODUCT_NAME) to use the microphone.",
                    speechRecognitionPermission:
                        "Allow $(PRODUCT_NAME) to use speech recognition.",
                    androidSpeechServicePackages: [
                        "com.google.android.googlequicksearchbox",
                    ],
                },
            ],
        ],

        experiments: {
            typedRoutes: true,
        },

        extra: {
            router: {},
            eas: {
                projectId: "6ebc7712-d3dd-4c2e-a871-43ebc60aab9e",
            },
        },
    },
};

import {View, ViewProps} from 'react-native';
import {useThemeColor} from "@/hooks/useThemeColor";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import React from "react";

interface ThemedViewProps extends ViewProps {
    className?: string;
    safe?: boolean;
}

const ThemedView = ({className, safe = false, children, style ,...rest}: ThemedViewProps) => {


        const backgroundColor = useThemeColor({}, 'background');
        const safeArea = useSafeAreaInsets();

        return (
            <View style={[
                {
                    flex: 1,
                    backgroundColor: backgroundColor,
                    paddingTop: safe ? safeArea.top : 0,
                    paddingBottom: safe ? safeArea.bottom : 0,
                    paddingLeft: safe ? safeArea.left : 0,
                    paddingRight: safe ? safeArea.right : 0
                },
                style,
            ]
            }
                  className={className}
                  {...rest}
            >
                {children}
            </View>
        )
    }
;

export default ThemedView;

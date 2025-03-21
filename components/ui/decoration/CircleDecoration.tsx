import {View, ViewProps} from 'react-native';
import React from "react";

interface CircleDecorationProps extends ViewProps {

}

const CircleDecoration = ({...rest}: CircleDecorationProps) => {
    return (
        <View
            className="absolute w-48 h-48 rounded-full bg-light-surfaceVariant/20"
            {...rest}
        />
    )
};

export default CircleDecoration;

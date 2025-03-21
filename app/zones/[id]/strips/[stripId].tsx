import React from 'react';
import {useLocalSearchParams} from "expo-router";
import ThemedText from "@/components/shared/ThemedText";

const StripDetails = () => {
    const {id, stripId} = useLocalSearchParams();

    return (
        <>
            <ThemedText>Detalles de la Franja {stripId} en la Zona {id}</ThemedText>
        </>
    );
};

export default StripDetails;

import React from 'react';
import {useLocalSearchParams} from "expo-router";
import ParkingArea from '@/components/ParkingArea';


const ZoneDetails = () => {
    const {id, name, identifier} = useLocalSearchParams<{
        id: string;
        name?: string;
        identifier?: string;
    }>();

    return (
        <ParkingArea
            id={id}
            name={name}
            identifier={identifier}
            />
    );
};

export default ZoneDetails;

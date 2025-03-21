import React from 'react';
import {useLocalSearchParams} from "expo-router";
import ParkingArea from '@/components/ParkingArea';

const ZoneDetails = () => {
    const {id} = useLocalSearchParams();

    return (
        <ParkingArea id={id}/>
    );
};

export default ZoneDetails;

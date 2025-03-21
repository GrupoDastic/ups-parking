import React, {Dispatch, SetStateAction} from "react";
import {View} from "react-native";
import Area from "@/components/zone/1/Area";
import {useQuery} from "@tanstack/react-query";
import {getAvailableParkingSpaces} from "@/services/parkingService";
import ThemedText from "./shared/ThemedText";
import {ParkingsSpaces} from "@/types";
import Spinner from "./ui/spinner/Spinner";

interface ParkingLotProps {
    id: string;
    strips: string;
}

const ParkingLot = ({id, strips}: ParkingLotProps) => {

    const parkingsSpaces = useQuery({
        queryKey: ['parkingSpaces', id, strips],
        queryFn: () => {
            return getAvailableParkingSpaces(id, strips);
        }
    });

    if (parkingsSpaces.isLoading) {
        return <Spinner text={"Cargando el mapa de la franja..."} className={"mb-5 mt-5"}/>
    }

    if (parkingsSpaces.isError) {
        return <ThemedText>Error...</ThemedText>;
    }

    const parkingSpacesData: ParkingsSpaces | undefined = parkingsSpaces.data;

    return (
        <View>
            <Area
                id={id}
                strips={strips}
                parkingSpacesData={parkingSpacesData}/>
        </View>
    );
};

export default ParkingLot;

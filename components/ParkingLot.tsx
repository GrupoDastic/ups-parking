import React from "react";
import {View} from "react-native";
import AreaBlockB from "@/components/zone/1/AreaBlockB";
import {useQuery} from "@tanstack/react-query";
import {getAvailableParkingSpaces} from "@/services/parkingService";
import {ParkingsSpaces} from "@/types";
import Spinner from "./ui/spinner/Spinner";
import ErrorPage from "@/components/ErrorPage";

interface ParkingLotProps {
    id: string | string[];
    strips: string;
}

const ParkingLot = ({id, strips}: ParkingLotProps) => {

    const parkingsSpaces = useQuery({
        queryKey: ['parkingSpaces', id, strips],
        queryFn: () => {
            return getAvailableParkingSpaces(id, strips);
        },
        retry: true,
        retryDelay: 5000,
        refetchInterval: 5000,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchIntervalInBackground: true,
    });

    if (parkingsSpaces.isLoading) {
        return <Spinner text={"Cargando el mapa de la franja..."} className={"mb-5 mt-5"}/>
    }

    if (parkingsSpaces.isError) {
        return <ErrorPage onRetry={
            () => parkingsSpaces.refetch()
        }/>
    }

    const parkingSpacesData: ParkingsSpaces | undefined = parkingsSpaces.data;

    return (
        <View>
            <AreaBlockB
                id={id}
                strips={strips}
                parkingSpacesData={parkingSpacesData}/>
        </View>
    );
};

export default ParkingLot;

import { View, ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAvailableParkingSpaces, getAvailableMap } from "@/services/parkingService";
import Spinner from "./ui/spinner/Spinner";
import ErrorPage from "@/components/ErrorPage";
import DynamicAreaBlock from "./zone/DynamicAreaBlock";

interface ParkingLotProps {
    id: string | string[];
    strips: string;
}

const ParkingLot = ({ id, strips }: ParkingLotProps) => {
    const parkingSpacesQuery = useQuery({
        queryKey: ["parkingSpaces", id, strips],
        queryFn: () => getAvailableParkingSpaces(id, strips),
        refetchInterval: 5000,
    });

    const mapQuery = useQuery({
        queryKey: ["map", id, strips],
        queryFn: () => getAvailableMap(id, strips),
    });

    if (parkingSpacesQuery.isLoading || mapQuery.isLoading) {
        return <Spinner text={"Cargando el mapa de la franja..."} className={"mb-5 mt-5"} />;
    }

    if (parkingSpacesQuery.isError || mapQuery.isError) {
        return <ErrorPage onRetry={() => {
            parkingSpacesQuery.refetch().then();
            mapQuery.refetch().then();
        }} />;
    }

    if (!mapQuery.data || !mapQuery.data.map || mapQuery.data.map.length === 0) {
        return <ErrorPage onRetry={() => mapQuery.refetch()} />;
    }

    const { width, height, viewbox, svg_content } = mapQuery.data.map[0];

    console.log(height)


    return (
        <View style={{ height: height + 50 }}>
            <ScrollView horizontal>
                <ScrollView>
                    <DynamicAreaBlock
                        width={width}
                        height={height}
                        viewBox={viewbox}
                        svgContent={svg_content.replace(/\$\$/g, "")}
                        parkingSpacesData={parkingSpacesQuery.data?.parking_spaces}
                    />
                </ScrollView>
            </ScrollView>
        </View>
    );
};

export default ParkingLot;

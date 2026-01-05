import {ScrollView, View} from "react-native";
import {useQuery} from "@tanstack/react-query";
import {getAvailableMap, getAvailableParkingSpaces} from "@/services/parkingService";
import Spinner from "@/components/ui/spinner/Spinner";
import ErrorPage from "@/components/ErrorPage";
import DynamicAreaBlock from "@/components/zone/DynamicAreaBlock";

interface ParkingLotProps {
    id: string | string[];
    strips: string;
}

const ParkingLot = ({id, strips}: ParkingLotProps) => {
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
        return <Spinner text={"Cargando el mapa de la franja..."} className={"mb-5 mt-5"}/>;
    }

    if (parkingSpacesQuery.isError || mapQuery.isError) {
        return <ErrorPage onRetry={() => {
            parkingSpacesQuery.refetch().then();
            mapQuery.refetch().then();
        }}/>;
    }

    if (!mapQuery.data || !mapQuery.data.map || mapQuery.data.map.length === 0) {
        return <ErrorPage onRetry={() => mapQuery.refetch()}/>;
    }

    const {width, height, viewbox, svg_content} = mapQuery.data.map[0];

    return (
        <View style={{flex: 1}}>
            <ScrollView
                horizontal
                nestedScrollEnabled
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{
                    width: width,
                    height: height,
                }}
            >
                <DynamicAreaBlock
                    width={width}
                    height={height}
                    viewBox={viewbox}
                    svgContent={svg_content.replace(/\$\$/g, "")}
                    parkingSpacesData={parkingSpacesQuery.data?.parking_spaces}
                />
            </ScrollView>
        </View>
    );
};

export default ParkingLot;

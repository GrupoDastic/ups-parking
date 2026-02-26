import React from "react";
import { ScrollView, View } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { getAvailableMap, getAvailableParkingSpaces } from "@/services/parkingService";
import Spinner from "@/components/ui/spinner/Spinner";
import ErrorPage from "@/components/ErrorPage";
import DynamicAreaBlock from "@/components/zone/DynamicAreaBlock";

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
        return <Spinner text="Cargando el mapa de la franja..." />;
    }

    if (parkingSpacesQuery.isError || mapQuery.isError) {
        return (
            <ErrorPage
                onRetry={() => {
                    parkingSpacesQuery.refetch();
                    mapQuery.refetch();
                }}
            />
        );
    }

    if (!mapQuery.data?.map?.length) {
        return <ErrorPage onRetry={mapQuery.refetch} />;
    }

    const { width, height, viewbox, svg_content } = mapQuery.data.map[0];

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator
            nestedScrollEnabled
        >
            <ScrollView
                showsVerticalScrollIndicator
                nestedScrollEnabled
                contentContainerStyle={{
                    padding: 10,
                }}
            >
                <View
                    style={{
                        width,
                        height,
                    }}
                >
                    <DynamicAreaBlock
                        width={width}
                        height={height}
                        viewBox={viewbox}
                        svgContent={svg_content.replace(/\$\$/g, "")}
                        parkingSpacesData={parkingSpacesQuery.data?.parking_spaces}
                    />
                </View>
            </ScrollView>
        </ScrollView>
    );
};

export default ParkingLot;

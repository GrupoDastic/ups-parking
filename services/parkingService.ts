import axios, {isAxiosError} from "axios";
import {ParkingsSpacesSchema, StripsSchema, ZonesSchema} from "@/types";

const API_URL = String(process.env.EXPO_PUBLIC_API_URL);
// export const getParkingAvailable = async (text: string) => {
//     try {
//         const {data} = await axios.get(`${API_URL}/parkings/request?text=${text}`);
//         const response = DataResponseSchema.safeParse(data);
//         if (response.success) {
//             return response.data;
//         }
//     } catch (error) {
//         if (isAxiosError(error) && error.response) {
//             throw new Error(error.response?.data.error)
//         }
//     }
// }

export const getAvailableZones = async () => {
    try {
        const {data} = await axios.get(`${API_URL}/parkings/zones`);
        const response = ZonesSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error)
        }
    }
}

export const getAvailableZonesStrips = async (zoneId : string) => {
    try {
        const {data} = await axios.get(`${API_URL}/parkings/zones/${zoneId}/strips`);
        const response = StripsSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error)
        }
    }
}

export const getAvailableParkingSpaces = async (zoneId : string, stripId: string) => {
    try {
        const {data} = await axios.get(`${API_URL}/parkings/zones/${zoneId}/strips/${stripId}/parking-spaces`);
        const response = ParkingsSpacesSchema.safeParse(data);
        if (response.success) {
            console.log(response.data);
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error)
        }
    }
}




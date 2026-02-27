import axios, {isAxiosError} from "axios";
import {DataResponseSchema, MapSchema, ParkingsSpacesSchema, StripsSchema, Zones, ZonesSchema} from "@/types";

const API_URL = process.env["EXPO_PUBLIC_API_URL"]

export const getParkingAvailable = async (text: string) => {
    try {
        const {data} = await axios.post(`${API_URL}/nlp/predict`, {text});
        const response = DataResponseSchema.safeParse(data);
        if (response.success) {
            console.log(response.data)
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error)
        }
    }
    return null;
}

export const getAvailableZones = async (): Promise<Zones> => {
    let data: unknown;
    try {
        const resp = await axios.get(`${API_URL}/parking/zones`);
        data = resp.data;
    } catch (error) {
        console.error("Error fetching zones:", error);
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.data);
        }

        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw error;
    }
    const parsed = ZonesSchema.safeParse(data);
    if (!parsed.success) {
        throw new Error("Invalid API response for zones");
    }
    return parsed.data;
};


export const getAvailableMap = async (zoneId : string | string[], stripId: string) => {
    try {
        const {data} = await axios.get(`${API_URL}/parking/zones/${zoneId}/strips/${stripId}/map`);
        const response = MapSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error)
        }
    }
}

export const getAvailableZonesStrips = async (zoneId : string | string[]) => {
    try {
        const {data} = await axios.get(`${API_URL}/parking/zones/${zoneId}/strips`);
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

export const getAvailableParkingSpaces = async (zoneId: string | string[], stripId: string) => {
    try {
        const { data } = await axios.get(`${API_URL}/parking/zones/${zoneId}/strips/${stripId}/parking-spaces`);
        const response = ParkingsSpacesSchema.safeParse(data);

        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data?.error || "Error al obtener datos del servidor.");
        }
        throw error;
    }
};

export const assignParking = async (zoneId: string | string[], stripId: string) => {
    try {
        const { data } = await axios.post(
            `${API_URL}/parking/zones/${zoneId}/strips/${stripId}/assign`
        );

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data?.error || "Error al asignar parqueo");
        }
        throw error;
    }
};

export const reserveParking = async (zoneId: string | string[], stripId: string, spaceId: string) => {
    try {
        const { data } = await axios.post(`${API_URL}/parking/zones/${zoneId}/strips/${stripId}/reserve`,{
        spaceId ,
        });
        return data; // contiene reservation_token, reservation_expires, parking_space, expires_in_seconds
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data?.error || "Error al reservar parqueo");
        }
        throw error;
    }
};

export const confirmReservation = async (zoneId: string | string[], stripId: string, token: string) => {
    try {
        const { data } = await axios.post(`${API_URL}/parking/zones/${zoneId}/strips/${stripId}/confirm`, { token });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data?.error || "Error al confirmar reserva");
        }
        throw error;
    }
};

export const cancelReservation = async (zoneId: string | string[], stripId: string, token: string) => {
    try {
        const { data } = await axios.post(`${API_URL}/parking/zones/${zoneId}/strips/${stripId}/cancel`, { token });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data?.error || "Error al cancelar reserva");
        }
        throw error;
    }
};
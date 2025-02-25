import axios, {isAxiosError} from "axios";
import {DataResponseSchema} from "@/types";

const API_URL = String(process.env.EXPO_PUBLIC_API_URL);
export const getParkingAvailable = async (text: string) => {
    try {
        const {data} = await axios.get(`${API_URL}/parkings/request?text=${text}`);
        const response = DataResponseSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error)
        }
    }
}

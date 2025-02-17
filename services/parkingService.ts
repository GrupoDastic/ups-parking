import axios from "axios";


export const getParkingAvailable = async () => {
    const API_URL = String(process.env.EXPO_PUBLIC_API_URL);
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

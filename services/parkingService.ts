import axios from "axios";


export const getParkingAvailable = async (text: string) => {
    const API_URL = String(process.env.EXPO_PUBLIC_API_URL);
    try {
        const {data} = await axios.get(`${API_URL}/parkings/request?text=${text}`);
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

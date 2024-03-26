import { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../../../contants/config";
import { apiClient } from "../../../lib/api";


export const updateUser = async (data: any): Promise<any> => {
    const config: AxiosRequestConfig = {
        method: 'PUT',
        url: `${BASE_URL}/user`,
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    const response = await apiClient(config);
    return response;
} 
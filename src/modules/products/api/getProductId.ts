import { apiClient } from "../../../lib/api";


export const getProductId = async (id: string): Promise<any> => {
    const res = await apiClient.get(`/product/${id}`);
    return res?.data;
}
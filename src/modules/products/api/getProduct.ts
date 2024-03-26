import { apiClient } from "../../../lib/api";


export const getProduct = async (): Promise<any> => {
    const res = await apiClient.get(`/product`);
    return res;
}
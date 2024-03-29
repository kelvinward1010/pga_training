import { apiClient } from "../../../lib/api";
import { IDataProduct } from "../types";


export const getProductId = async (id: string): Promise<IDataProduct> => {
    const res = await apiClient.get(`/product/${id}`);
    return res?.data;
}
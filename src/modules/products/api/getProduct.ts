import { apiClient } from "../../../lib/api";
import { IlistDataProduct } from "../types";


export const getProduct = async (): Promise<IlistDataProduct> => {
    const res = await apiClient.get(`/product`);
    return res.data;
}
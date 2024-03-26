import { apiClient } from "../../../lib/api";
import { IProduct } from "../types";


export const createProduct = async (product: IProduct): Promise<any> => {
    const res = await apiClient.post(`/product`, product)
    return res;
}
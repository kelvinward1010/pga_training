import { apiClient } from "../../../lib/api";
import { IProduct } from "../types";


export const updateProduct = async (product: IProduct): Promise<any> => {
    const res = await apiClient.put(`/product`, product)
    return res;
}
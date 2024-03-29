import { apiClient } from "../../../lib/api";
import { ICreateProduct, IProduct } from "../types";


export const createProduct = async (product: IProduct): Promise<ICreateProduct> => {
    const res = await apiClient.post(`/product`, product);
    return res.data;
}
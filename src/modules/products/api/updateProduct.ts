import { apiClient } from "../../../lib/api";
import { IProduct, IUpdateProduct } from "../types";


export const updateProduct = async (product: IProduct): Promise<IUpdateProduct> => {
    const res = await apiClient.put(`/product`, product);
    return res.data;
}
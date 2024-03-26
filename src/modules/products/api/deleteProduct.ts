import { apiClient } from "../../../lib/api";


export const deleteProduct = async (id: any): Promise<any> => {
    const res = await apiClient.delete(`/product/${id}`)
    return res;
}
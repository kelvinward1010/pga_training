import { apiClient } from "../../../lib/api";


export const getUser = async (): Promise<any> => {
    const res = await apiClient.get(`/user`);
    return res.data;
}
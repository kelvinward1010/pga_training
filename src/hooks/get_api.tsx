import { useEffect, useState } from "react"
import { apiClient } from "../lib/api";



export const useGetApi = (URL: string) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAnything = async (): Promise<any> => {
        try {
            await apiClient.get(URL).then((response: any) => {
                setData(response?.data);
            })
        } catch (error: any) {
            setError(error.message);
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getAnything();
    },[URL])

    return {data, loading, error}
}
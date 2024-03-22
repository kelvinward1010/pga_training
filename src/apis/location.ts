import { URL_LOCATION } from "../contants/config"
import { useFetchApi } from "../lib/api"


export const getLocations = async (): Promise<any> => {
    const res = await useFetchApi(URL_LOCATION, 'GET');
    return res;
}

export const getStatesInLocation = async (pid: string): Promise<any> => {
    const res = await useFetchApi(`${URL_LOCATION}?pid=${pid}`, 'GET');
    return res;
}
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "../contants/config";
import storage from "../utils/storage";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 60 * 30 * 2 * 24 * 24 // 1 DAY
})


apiClient.interceptors.request.use(
  function (config) {
    config.headers.Authorization = "Bearer" + storage.getToken();
    return Promise.resolve(config);
  },
  function (error) {
    return Promise.reject(error);
  }
)



export async function useFetchApi<T>(
  apiUrl: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: any
): Promise<T> {
  try {
    const config: AxiosRequestConfig = {
      method,
      url: apiUrl,
      data,
    };

    const response = await apiClient(config);
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      switch (axiosError.response.status) {
        case 401:
          console.error('Unauthorized: Please authenticate');
          break;
        case 404:
          console.error('Resource not found');
          break;
        default:
          console.error('Error fetching data:', axiosError.message);
      }
    } else {
      console.error('Network error:', axiosError.message);
      return Promise.reject(axiosError.message);
    }
    return Promise.reject(axiosError.message);
  }
}

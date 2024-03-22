import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types/user";
import { BASE_URL, OTHER_API_URL, URL_REGISTER } from "../../contants/config";
import storageFetch from "../../utils/storage";
import { AxiosRequestConfig } from "axios";
import { apiClient } from "../../lib/api";

export interface AuthResponse {
    user: User;
    user_cookie: string;
}

interface LoginValues {
    email: string;
    password: string;
}

export interface RegisterValues {
    name: string,
    email: string,
    password: string,
    repeatPassword: string,
    gender: string,
    region: number,
    state: number,
}

export const registerUser = createAsyncThunk<AuthResponse, RegisterValues, { rejectValue: string }>(
    'users/create',
    async (userData, { rejectWithValue }) => {
        try {

            const config: AxiosRequestConfig = {
                method: 'POST',
                url: `${URL_REGISTER}`,
                data: userData,
                headers: {

                    'Content-Type': 'application/json',
                },
            };
            const response = await apiClient(config);
            const data: AuthResponse = await response.data;
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message as string);
        }
    }
);

export const loginUser = createAsyncThunk<AuthResponse, LoginValues, { rejectValue: string }>(
    'authentication/login',
    async (credentials, { rejectWithValue }) => {
        try {

            const config: AxiosRequestConfig = {
                method: 'POST',
                url: `${BASE_URL}/authentication/login`,
                data: credentials,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const response = await apiClient(config);
            const data: AuthResponse = await response.data;
            storageFetch.setToken(data?.user_cookie)
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message as string);
        }
    }
);

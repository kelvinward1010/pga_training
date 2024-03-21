import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types/user";
import { BASE_URL, OTHER_API_URL } from "../../contants/config";
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
}

export const registerUser = createAsyncThunk<AuthResponse, RegisterValues, { rejectValue: string }>(
    'users/create',
    async (userData, { rejectWithValue }) => {
        try {

            const config: AxiosRequestConfig = {
                method: 'POST',
                url: `${OTHER_API_URL}users/create`,
                data: userData,
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
            const response = await fetch(`${BASE_URL}/authentication/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            const data: AuthResponse = await response.json();
            storageFetch.setToken(data?.user_cookie)
            if (!response.ok) {
                throw new Error(data.user.name || 'Unable to log in');
            }
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message as string);
        }
    }
);

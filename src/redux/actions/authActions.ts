import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types/user";
import { BASE_URL } from "../../contants/config";

export interface AuthResponse {
    user: User;
    token: string;
}

interface LoginValues {
    email: string;
    password: string;
}

export const registerUser = createAsyncThunk<AuthResponse, User, { rejectValue: string }>(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const data: AuthResponse = await response.json();
            if (!response.ok) {
                throw new Error(data.user.name || 'Unable to register');
            }
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
            if (!response.ok) {
                throw new Error(data.user.name || 'Unable to log in');
            }
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message as string);
        }
    }
);

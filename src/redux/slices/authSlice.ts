import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";
import { AuthResponse, loginUser, registerUser } from "../actions/authActions";

interface AuthState {
    user: User | null;
    error: string | null;
    isLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    error: null,
    isLoading: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.error = null;
            state.isLoading = false;
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                registerUser.fulfilled,
                (state, action: PayloadAction<AuthResponse>) => {
                    state.isLoading = false;
                    state.user = action.payload.user;
                }
            )
            .addCase(
                registerUser.rejected,
                (state, action: PayloadAction<any>) => {
                    state.isLoading = false;
                    state.error = action.payload;
                }
            )
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                loginUser.fulfilled,
                (state, action: PayloadAction<AuthResponse>) => {
                    state.isLoading = false;
                    state.user = action.payload.user;
                }
            )
            .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    logout,
  } = authSlice.actions;

export default authSlice.reducer;

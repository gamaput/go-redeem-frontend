import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '../../app/store';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    // ...
}

interface AuthState {
    isAuthenticated: boolean;
    isAdmin: boolean;
    user: User | null;
    message: string | null; // Tambahkan properti message
    // ...
}

const initialState: AuthState = {
    isAuthenticated: false,
    isAdmin: false,
    user: null,
    message: null, // Inisialisasi message dengan null
    // ...
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, { dispatch }) => {
        try {
            const response = await axios.post('http://localhost:8081/api/signin', credentials);

            const user = response.data;
            const token = response.data.token;
            const isAdmin = user.role;

            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('token', token);

            dispatch(loginSuccess({ isAdmin, user }));
        } catch (error) {
            dispatch(setErrorMessage('Failed to login')); // Dispatch action untuk mengatur pesan error
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (credentials: { name: string; email: string; password: string; role: string }, { dispatch }) => {
        try {
            const response = await axios.post('http://localhost:8081/api/register', credentials);

            // const user = response.data;
            // const token = response.data.token;


            // sessionStorage.setItem('user', JSON.stringify(user));
            // sessionStorage.setItem('token', token);

            // dispatch(registerSuccess({ user }));
            dispatch(setErrorMessage('Success to register'));
        } catch (error) {
            dispatch(setErrorMessage('Failed to register')); // Dispatch action untuk mengatur pesan error
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
    try {
        await axios.get('http://localhost:8081/api/logout');
        dispatch(logoutSuccess());
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    } catch (error) {
        dispatch(setErrorMessage('Failed to logout')); // Dispatch action untuk mengatur pesan error
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<{ isAdmin: boolean; user: User }>) {
            state.isAuthenticated = true;
            state.isAdmin = action.payload.isAdmin;
            state.user = action.payload.user;
            state.message = null; // Reset message ketika login berhasil
            // ...
        },
        logoutSuccess(state) {
            state.isAuthenticated = false;
            state.isAdmin = false;
            state.user = null;
            state.message = null; // Reset message ketika logout berhasil
            // Reset other state properties as needed
        },
        setErrorMessage(state, action: PayloadAction<string>) {
            state.message = action.payload; // Set pesan error pada state message
        },
        registerSuccess(state, action: PayloadAction<{ user: User }>) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = null; // Reset message ketika registrasi berhasil
            // ...
        },
        reset(state) {
            return initialState; // Mengembalikan state awal ketika reset dipanggil
        },
    },
});

export const { loginSuccess, logoutSuccess, setErrorMessage, registerSuccess, reset } = authSlice.actions;

export default authSlice.reducer;

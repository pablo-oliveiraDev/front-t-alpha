import { RootState } from '@/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
    isAuthenticated:
        typeof window !== 'undefined' && !!localStorage.getItem('token'),
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    status: 'idle'
};

// Thunk para o login
export const loginAsync = createAsyncThunk(
    'auth/login',
    async ({
        taxNumber,
        password
    }: {
        taxNumber: string;
        password: string;
    }) => {
        const response = await fetch(
            'https://interview.t-alpha.com.br/api/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ taxNumber, password })
            }
        );

        if (!response.ok) {
            throw new Error('Falha na autenticação');
        }

        const data = await response.json();
        console.log("data:"+data.token);
        return JSON.stringify(data.token);
    }
);

// Thunk para o registro
export const registerAsync = createAsyncThunk(
    'auth/register',
    async ({
        name,
        taxNumber,
        mail,
        phone,
        password
    }: {
        name: string;
        taxNumber: string;
        mail: string;
        phone: string;
        password: string;
    }) => {
        const response = await fetch(
            'https://interview.t-alpha.com.br/api/auth/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, taxNumber, mail, phone, password })
            }
        );

        if (!response.ok) {
            throw new Error('Falha no registro');
        }

        const data = await response.json();
        return data;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.token = action.payload;
                state.status = 'idle';
                if (typeof window !== 'undefined') {
                    localStorage.setItem('token', action.payload);
                }
            })
            .addCase(loginAsync.rejected, state => {
                state.status = 'failed';
                state.isAuthenticated = false;
                state.token = null;
            })
            .addCase(registerAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.token = action.payload;
                state.status = 'idle';
                localStorage.setItem('token', action.payload);
            })
            .addCase(registerAsync.rejected, state => {
                state.status = 'failed';
                state.isAuthenticated = false;
                state.token = null;
            });
    }
});

export const { logout } = authSlice.actions;
export const selectIsAuthenticated = (state: RootState) =>
    state.auth.isAuthenticated;
export default authSlice.reducer;

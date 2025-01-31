import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'src/api';

export const fetchClientIilyas = createAsyncThunk(
    'raiting/fetchClientIilyas',
    async () => {
        const response = await api.get('/fenixclient');
        return response.data;
    }
);

const initialState = {
    client: [],
    client_status: 'idle',
    client_error: null,
};

const ClientSliceilyas = createSlice({
    name: 'raiting-client-ilyas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClientIilyas.pending, (state) => {
                state.client_status = 'loading';
            })
            .addCase(fetchClientIilyas.fulfilled, (state, action) => {
                state.client_status = 'succeeded';
                state.client = action.payload;
            })
            .addCase(fetchClientIilyas.rejected, (state, action) => {
                state.client_status = 'failed';
                state.client_error = action.error.message;
            })
    },
});

export default ClientSliceilyas.reducer;

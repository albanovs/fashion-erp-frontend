import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'src/api';

export const fetchClientMonaco = createAsyncThunk(
    'raiting/fetchClientMonaco',
    async () => {
        const response = await api.get('/monacoclient');
        return response.data;
    }
);

const initialState = {
    client: [],
    client_status: 'idle',
    client_error: null,
};

const ClientSliceMonaco = createSlice({
    name: 'raiting-client-monaco',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClientMonaco.pending, (state) => {
                state.client_status = 'loading';
            })
            .addCase(fetchClientMonaco.fulfilled, (state, action) => {
                state.client_status = 'succeeded';
                state.client = action.payload;
            })
            .addCase(fetchClientMonaco.rejected, (state, action) => {
                state.client_status = 'failed';
                state.client_error = action.error.message;
            })
    },
});

export default ClientSliceMonaco.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'src/api';

export const fetchClientTuran = createAsyncThunk(
    'raiting/fetchClientTuran',
    async () => {
        const response = await api.get('/turanclient');
        return response.data;
    }
);

const initialState = {
    client: [],
    client_status: 'idle',
    client_error: null,
};

const ClientSliceMonaco = createSlice({
    name: 'raiting-client-turan',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClientTuran.pending, (state) => {
                state.client_status = 'loading';
            })
            .addCase(fetchClientTuran.fulfilled, (state, action) => {
                state.client_status = 'succeeded';
                state.client = action.payload;
            })
            .addCase(fetchClientTuran.rejected, (state, action) => {
                state.client_status = 'failed';
                state.client_error = action.error.message;
            })
    },
});

export default ClientSliceMonaco.reducer;

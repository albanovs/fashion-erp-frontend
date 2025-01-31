import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'src/api';

export const fetchItogs = createAsyncThunk(
    'raiting/fetchItogs',
    async () => {
        const response = await api.get('/calcitog');
        return response.data;
    }
);

export const fetchItoglast = createAsyncThunk(
    'raiting/fetchItoglast',
    async () => {
        const response = await api.get('/calcitoglast');
        return response.data;
    }
)

const initialState = {
    itogs: [],
    itoglast: [],
    status: 'idle',
    error: null,
    status_itoglast: 'idle',
    error_itoglast: null
};

const itogSlice = createSlice({
    name: 'itogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItogs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchItogs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.itogs = action.payload;
            })
            .addCase(fetchItogs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchItoglast.pending, (state) => {
                state.status_itoglast = 'loading';
            })
            .addCase(fetchItoglast.fulfilled, (state, action) => {
                state.status_itoglast = 'succeeded';
                state.itoglast = action.payload;
            })
            .addCase(fetchItoglast.rejected, (state, action) => {
                state.status_itoglast = 'failed';
                state.error_itoglast = action.error.message;
            })
    },
});

export default itogSlice.reducer;

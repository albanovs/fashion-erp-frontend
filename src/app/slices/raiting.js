import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'src/api';

export const fetchManagers = createAsyncThunk(
    'raiting/fetchManagers',
    async () => {
        const response = await api.get('/raiting-manager');
        return response.data;
    }
);

export const fetchBuyerRaiting = createAsyncThunk(
    'raiting/fetchBuyerRaiting',
    async () => {
        const response = await api.get('/raitingbuyer');
        return response.data;
    }
);

const initialState = {
    managers: [],
    buyerRaiting: null,
    status_manager: 'idle',
    error_manager: null,
    status_buyer: 'idle',
    error_buyer: null,
};

const raitingSlice = createSlice({
    name: 'raiting',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchManagers.pending, (state) => {
                state.status_manager = 'loading';
            })
            .addCase(fetchManagers.fulfilled, (state, action) => {
                state.status_manager = 'succeeded';
                state.managers = action.payload;
            })
            .addCase(fetchManagers.rejected, (state, action) => {
                state.status_manager = 'failed';
                state.error_manager = action.error.message;
            })
            .addCase(fetchBuyerRaiting.pending, (state) => {
                state.status_buyer = 'loading';
            })
            .addCase(fetchBuyerRaiting.fulfilled, (state, action) => {
                state.status_buyer = 'succeeded';
                state.buyerRaiting = action.payload;
            })
            .addCase(fetchBuyerRaiting.rejected, (state, action) => {
                state.status_buyer = 'failed';
                state.error_buyer = action.error.message;
            });
    },
});

export default raitingSlice.reducer;

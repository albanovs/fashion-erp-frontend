import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'src/api';

export const fetchReportsSimManager = createAsyncThunk(
    'raiting/fetchsimcardmanagers',
    async () => {
        const response = await api.get('/test/simcardmanagers');
        return response.data;
    }
);

const initialState = {
    simcard: [],
    status: 'idle',
    error: null,
};

const reportSliceSimManagers = createSlice({
    name: 'sim-managers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReportsSimManager.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchReportsSimManager.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.simcard = action.payload;
            })
            .addCase(fetchReportsSimManager.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export default reportSliceSimManagers.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'src/api';

export const fetchReportsSimIT = createAsyncThunk(
    'raiting/fetchsimcardit',
    async () => {
        const response = await api.get('/test/simCardglobal');
        return response.data;
    }
);

const initialState = {
    simcard: [],
    status: 'idle',
    error: null,
};

const reportSliceSimIt = createSlice({
    name: 'sim-it',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReportsSimIT.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchReportsSimIT.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.simcard = action.payload;
            })
            .addCase(fetchReportsSimIT.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export default reportSliceSimIt.reducer;

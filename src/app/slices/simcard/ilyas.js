import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'src/api';

export const fetchReportsSimLog = createAsyncThunk(
    'raiting/fetchsimcardlogilyas',
    async () => {
        const response = await api.get('/test/simcardfenixlogs');
        return response.data;
    }
);

const initialState = {
    simcard: [],
    status: 'idle',
    error: null,
};

const reportSliceSimLog = createSlice({
    name: 'simlog-ilyas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReportsSimLog.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchReportsSimLog.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.simcard = action.payload;
            })
            .addCase(fetchReportsSimLog.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export default reportSliceSimLog.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'src/api';

export const fetchReportsSimLog = createAsyncThunk(
    'raiting/fetchsimcardlogmonaco',
    async () => {
        const response = await api.get('/test/simcardliderlogs');
        return response.data;
    }
);

const initialState = {
    simcard: [],
    status: 'idle',
    error: null,
};

const reportSliceSimLogMonaco = createSlice({
    name: 'simlog-monaco',
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

export default reportSliceSimLogMonaco.reducer;

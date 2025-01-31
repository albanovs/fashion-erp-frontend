import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'src/api';

export const fetchReportsSimLog = createAsyncThunk(
    'raiting/fetchsimcardlogturan',
    async () => {
        const response = await api.get('/test/simcardturanlogs');
        return response.data;
    }
);

const initialState = {
    simcard: [],
    status: 'idle',
    error: null,
};

const reportSliceSimLogTuran = createSlice({
    name: 'simlog-turan',
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

export default reportSliceSimLogTuran.reducer;

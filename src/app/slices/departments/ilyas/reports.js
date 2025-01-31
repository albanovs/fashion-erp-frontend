import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'src/api';

export const fetchReports = createAsyncThunk(
    'raiting/fetchReportsilyas',
    async () => {
        const response = await api.get('/test/fenixdatas');
        return response.data;
    }
);

const initialState = {
    reports: [],
    status: 'idle',
    error: null,
};

const reportSlice = createSlice({
    name: 'reports-ilyas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReports.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchReports.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.reports = action.payload;
            })
            .addCase(fetchReports.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export default reportSlice.reducer;

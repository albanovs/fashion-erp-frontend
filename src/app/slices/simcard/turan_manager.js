import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'src/api';

export const fetchReportsSimManager = createAsyncThunk(
    'raiting/fetchsimcardmanagerturan',
    async () => {
        const response = await api.get('/test/simCardTurans');
        return response.data;
    }
);

const initialState = {
    simcard: [],
    status: 'idle',
    error: null,
};

const reportSliceSimManagerTuran = createSlice({
    name: 'sim-manager-turan',
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

export default reportSliceSimManagerTuran.reducer;

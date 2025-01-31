import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'src/api';

export const fetchReportsSimManager = createAsyncThunk(
    'raiting/fetchsimcardmanagermonaco',
    async () => {
        const response = await api.get('/test/simCardLiders');
        return response.data;
    }
);

const initialState = {
    simcard: [],
    status: 'idle',
    error: null,
};

const reportSliceSimManagerMonaco = createSlice({
    name: 'sim-manager-monaco',
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

export default reportSliceSimManagerMonaco.reducer;

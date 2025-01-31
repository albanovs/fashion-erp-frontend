import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'src/api';

export const fetchAdmins = createAsyncThunk(
    'raiting/fetchAdmins',
    async () => {
        const response = await api.get('/lidercalclogist');
        return response.data;
    }
);

const initialState = {
    admins: [],
    status: 'idle',
    error: null,
};

const admin_raitingSlice = createSlice({
    name: 'raiting-admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdmins.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAdmins.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.admins = action.payload;
            })
            .addCase(fetchAdmins.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export default admin_raitingSlice.reducer;

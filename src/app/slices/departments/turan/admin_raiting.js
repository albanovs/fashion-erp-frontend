import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'src/api';

export const fetchAdminsTuran = createAsyncThunk(
    'raiting/fetchAdminsturan',
    async () => {
        const response = await api.get('/turancalclogist');
        return response.data;
    }
);

const initialState = {
    turan_admins: [],
    turan_status: 'idle',
    turan_error: null,
};

const admin_raitingSliceturan = createSlice({
    name: 'raiting-admin-turan',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminsTuran.pending, (state) => {
                state.turan_status = 'loading';
            })
            .addCase(fetchAdminsTuran.fulfilled, (state, action) => {
                state.turan_status = 'succeeded';
                state.turan_admins = action.payload;
            })
            .addCase(fetchAdminsTuran.rejected, (state, action) => {
                state.turan_status = 'failed';
                state.turan_error = action.error.message;
            })
    },
});

export default admin_raitingSliceturan.reducer;

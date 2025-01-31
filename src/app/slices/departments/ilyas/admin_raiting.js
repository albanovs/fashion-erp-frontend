import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'src/api';

export const fetchAdminsIilyas = createAsyncThunk(
    'raiting/fetchAdminsIilyas',
    async () => {
        const response = await api.get('/fenixcalclogist');
        return response.data;
    }
);

const initialState = {
    ilyas_admins: [],
    ilyas_status: 'idle',
    ilyas_error: null,
};

const admin_raitingSliceilyas = createSlice({
    name: 'raiting-admin-ilyas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminsIilyas.pending, (state) => {
                state.ilyas_status = 'loading';
            })
            .addCase(fetchAdminsIilyas.fulfilled, (state, action) => {
                state.ilyas_status = 'succeeded';
                state.ilyas_admins = action.payload;
            })
            .addCase(fetchAdminsIilyas.rejected, (state, action) => {
                state.ilyas_status = 'failed';
                state.ilyas_error = action.error.message;
            })
    },
});

export default admin_raitingSliceilyas.reducer;

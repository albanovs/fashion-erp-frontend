import { createSlice } from '@reduxjs/toolkit';

const sidebarShow = JSON.parse(localStorage.getItem('sidebarShow')) ?? true;
const sidebarUnfoldable = JSON.parse(localStorage.getItem('sidebarUnfoldable')) ?? false;

const initialState = {
    sidebarShow,
    sidebarUnfoldable,
    theme: 'light',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        set: (state, action) => {
            Object.assign(state, action.payload);
        },
        setSidebarShow: (state, action) => {
            state.sidebarShow = action.payload;
            localStorage.setItem('sidebarShow', JSON.stringify(action.payload));
        },
        setSidebarUnfoldable: (state, action) => {
            state.sidebarUnfoldable = action.payload;
            localStorage.setItem('sidebarUnfoldable', JSON.stringify(action.payload));
        },
    },
});

export const { set, setSidebarShow, setSidebarUnfoldable } = uiSlice.actions;
export default uiSlice.reducer;
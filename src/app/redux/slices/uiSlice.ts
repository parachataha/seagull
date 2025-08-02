import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UISlice {
    loading: boolean,
}

const initialState: UISlice = { loading: false } 

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        startLoading: (state) => {
            return { ...state, loading: true }
        },
        stopLoading: (state) => {
            return { ...state, loading: false }
        }
    },
});

export const { startLoading, stopLoading } = uiSlice.actions;
export default uiSlice.reducer;

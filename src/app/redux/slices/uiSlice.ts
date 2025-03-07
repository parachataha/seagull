import { User } from "@/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { loading: boolean } = { loading: false } 

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        startLoading: () => {
            return { loading: true }
        },
        stopLoading: () => {
            return { loading: false }
        },
    },
});

export const { startLoading, stopLoading } = uiSlice.actions;
export default uiSlice.reducer;

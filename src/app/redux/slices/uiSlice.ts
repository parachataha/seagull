import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UISlice {
    loading: boolean, 
    darkMode: boolean,
}

const initialState: UISlice = { loading: false, darkMode: false } 

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        startLoading: (state) => {
            return { ...state, loading: true }
        },
        stopLoading: (state) => {
            return { ...state, loading: false }
        },
        // DARK/LIGHT MODE
        lightMode: (state) => {
            return { ...state, darkMode: false }
        },
        darkMode: (state) => {
            return { ...state, darkMode: true }
        }
    },
});

export const { startLoading, stopLoading, lightMode, darkMode } = uiSlice.actions;
export default uiSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface toast { 
    id: string,
    type: "success" | "error" | "warning",
    title: string,
    body: string,
    icon: "check" | "cross" | "warning",
}

interface UISlice {
    loading: boolean,
    toasts: toast[]
}

const initialState: UISlice = { 
    loading: false ,
    toasts: []
} 

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

        /**
         * Creates a new toast to be displayed. Must have removeToast after a toast duration
         */
        createToast: (state, action : PayloadAction<toast>) => {
            return { 
                ...state, 
                toasts: [ ...state.toasts, action.payload ]
            }
        }, 
        /**
         * Used to remove toasts after toast duration passes
         */
        removeToast: (state, action: PayloadAction<string>) => {
            state.toasts = state.toasts.filter(t => t.id !== action.payload);
        }

    },
});

export const { startLoading, stopLoading } = uiSlice.actions;
export default uiSlice.reducer;

import { User } from "@/generated/prisma";
import { SafeUser } from "@/lib/types/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SafeUser = {
  id: 0,
  name: "",
  email: "",
  slug: "",
  avatarUrl: null,
  bio: "",
  createdAt: 0,
  updatedAt: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<SafeUser>) => {
            return { 
                ...action.payload, 
            };
        },
        updateUser: (state, action: PayloadAction<Partial<SafeUser>>) => {
            return { 
                ...state, 
                ...action.payload, 
            };
        },
        clearUser: () => initialState,
    },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

import { User } from "@/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    slug: "",
    createdAt: null,
    avatar: "/images/public/avatars/orange.png",
    tags: [],
    hireable: null,
    onboarding: null,
    about: "",
    followersCount: 0,
    followingCount: 0
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            return { ...action.payload, };
        },
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            return { ...state, ...action.payload };
        },
        clearUser: () => initialState,
    },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

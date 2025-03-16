import { User } from "@/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    slug: "",
    createdAt: null,
    avatar: 6,
    avatar_url: "/images/public/avatars/orange.png",
    tags: [],
    hireable: null,
    onboarding: null,
    about: "",
    followersCount: 0,
    followingCount: 0,
    followers: [],
    followed: [],
    experience: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            return { ...action.payload };
        },
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            return { ...state, ...action.payload };
        },
        clearUser: () => initialState,
    },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

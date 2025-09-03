import { PublicSafeUser, SafeUser } from "@/lib/types/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReduxPublicSafeUser extends PublicSafeUser {
    email: string
}

const initialState: ReduxPublicSafeUser = {
  id: 0,
  name: "",
  email: "",
  slug: "",
  about: "",
  label: "",
  location: null,
  timezone: null,
  startWork: null,
  endWork: null,
  createdAt: 0,
  avatarId: 1,
  updatedAt: null,
  skills: [],
  avatar: {
    url: ""
  },
  projects: [],
  timelines: [],
  blogs: [],
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

import { User, User_Tag } from "@/generated/prisma";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserType = Omit<User, 'password' | 'createdAt'> & {
  createdAt: string | Date
  password?: string | null,
  userAgent?: string | null,
  tags?: User_Tag[]
};

const initialState: UserType = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  createdAt: "",
  bio: "",
  label: "",
  userAgent: "null",
  tags: []
};


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserType>) => {
            return { 
                ...action.payload, 
                createdAt: action.payload.createdAt 
                    ? new Date(action.payload.createdAt).toISOString() : ""
            };
        },
        updateUser: (state, action: PayloadAction<Partial<UserType>>) => {
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

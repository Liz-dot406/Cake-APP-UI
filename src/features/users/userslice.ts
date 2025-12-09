// src/features/users/userSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  userid: number;
  name: string;
  email: string;
  role: string;
  token: string;
  phone?: string;
  address?: string;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
    updateUserInfo: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { loginUser, logoutUser, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;

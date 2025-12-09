import { createSlice } from "@reduxjs/toolkit";


export type UserState = {
    token: string | null;
    user: {
        userid: number;
        name: string;
        email: string;
        phone: string;
        role: string;
    } | null;
}


const initialState: UserState = {
    token: null,
    user: null
}

const userSlice = createSlice({ 
    name: 'user',
    initialState,
    reducers: { 
        loginSuccess: (state, action) => {
            state.token = action.payload.token; 
            state.user = action.payload.user 
        },
        logOut: (state) => {
            state.token = null;
            state.user = null;
        }
    }
})


export const { loginSuccess, logOut } = userSlice.actions
export default userSlice.reducer
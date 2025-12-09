// src/features/users/loginThunk.ts
import { loginUser } from "./userslice";
import type { AppDispatch } from "../../app/store";

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Login failed");

    // Map API user_Id → slice userid
    dispatch(
      loginUser({
        userid: data.user.user_Id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        token: data.token,
      })
    );
  } catch (err: any) {
    console.error("Login error:", err.message);
    throw err;
  }
};

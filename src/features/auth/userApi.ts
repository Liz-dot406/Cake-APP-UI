import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";

export type TUser = {
  userId?: number;
  name: string;
  email: string;
  password: string;
  role?: "customer" | "admin";
  phone?: string;
  address?: string;
};

export const usersAPI = createApi({
  reducerPath: "usersAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    createUser: builder.mutation<{ message: string }, Partial<TUser>>({
      query: (newUser) => ({
        url: "/users/register",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"], // fine here
    }),
    verifyUser: builder.mutation<
      { message: string },
      { email: string; verification_code: number }
    >({
      query: (data) => ({
        url: "/users/verify",
        method: "POST",
        body: {
          email: data.email.trim().toLowerCase(),
          code: data.verification_code,
        },
      }),
      // DO NOT touch invalidatesTags here
    }),
  }),
});

export const { useCreateUserMutation, useVerifyUserMutation } = usersAPI;

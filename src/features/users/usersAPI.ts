import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";
import type { RootState } from "../../app/store";

export type Typeuser = {
  user_Id: number;           
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  address?: string;
  role: 'customer' | 'admin'; 
  Created_At?: string;
  Updated_At?: string;
  verification_code?: string | null;
  is_verified?: boolean | null;
};

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
   
    getUsers: builder.query<Typeuser[], void>({
      query: () => '/users',
      providesTags: ['User'],
    }),
    
getUserById: builder.query<Typeuser, number>({
  query: (userId) => `/users/${userId}`,
  providesTags: ['User'],
}),


    
    createUser: builder.mutation<Typeuser, Partial<Typeuser>>({
      query: (newUser) => ({
        url: '/users/register',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'],
    }),

   
    updateUser: builder.mutation<Typeuser, Partial<Typeuser> & { user_Id: number }>({
      query: (updatedUser) => ({
        url: `/users/${updatedUser.user_Id}`,
        method: 'PUT',
        body: updatedUser,
      }),
      invalidatesTags: ['User'],
    }),

    
    deleteUser: builder.mutation<{ success: boolean; user_Id: number }, number>({
      query: (user_Id) => ({
        url: `/users/${user_Id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});


export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
} = usersAPI;

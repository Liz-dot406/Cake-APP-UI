import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";



export type TypeCake = {
  cakeId: number;
cakeName: string;
 flavorsUsed?: string;
  description: string;
  size: string;
  price: number;
  imageURL?: string;
  localImage?: string;
  available: boolean;
  isactive: boolean;
  Created_At: string;
  Updated_At: string;
  quantityAvailable: number;
  
};


export const cakesAPI = createApi({
  reducerPath: 'cakesAPI',
  baseQuery: fetchBaseQuery({ baseUrl: ApiDomain }),
  tagTypes: ['Cake'],
  endpoints: (builder) => ({
   
    getCakes: builder.query<TypeCake[], void>({
  query: () => '/readycakes',
 transformResponse: (response: any[]): TypeCake[] => {
  return response.map((cake) => ({
    cakeId: cake.cakeId,
    cakeName: cake.cakeName,
    description: cake.flavorsUsed,
    size: cake.size,
    price: cake.price,
    imageURL: `${ApiDomain}/uploads/${cake.imageURL}`, 
    localImage: cake.imageURL, 
    isactive: cake.isactive,
    available: cake.isactive,
    Created_At: cake.createdAt,
    Updated_At: cake.updatedAt,
    quantityAvailable: cake.quantityAvailable,
  }));
},


}),
    createCake: builder.mutation<TypeCake, Partial<TypeCake>>({
      query: (newCake) => ({
        url: '/readycakes',
        method: 'POST',
        body: newCake,
      }),
      invalidatesTags: ['Cake'],
    }),
    updateCake: builder.mutation<TypeCake, Partial<TypeCake> & { cake_Id: number }>({
      query: (cake) => ({
        url: `/readycakes/${cake.cake_Id}`,
        method: 'PUT',
        body: cake,
      }),
      invalidatesTags: ['Cake'],
    }),
    deleteCake: builder.mutation<{ success: boolean; cake_Id: number }, number>({
      query: (cake_Id) => ({
        url: `/readycakes/${cake_Id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cake'],
    }),
  }),
});

export const {
  useGetCakesQuery,
  useCreateCakeMutation,
  useUpdateCakeMutation,
  useDeleteCakeMutation,
} = cakesAPI;


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";


export type TypeOrder = {
  Id: number;
  userid: number;
  DesignId?: number;
  CakeID?: number;          
  Size: "Small" | "Medium" | "Large";
  Flavor: string;
  Message?: string;
  Status: string;
  DeliveryDate: string;
  Price: number;
  Notes?: string;
  ExtendedDescription?: string;
  SampleImages?: string;
  ColorPreferences?: string;
  CreatedAt: string;
  UpdatedAt?: string;
};


export type CreateOrderPayload = {
  CakeID: number;
  Size: "Small" | "Medium" | "Large";
  Flavor: string;
  Message?: string;
  DeliveryDate: string;
  Price: number;
  userid: number;
  Status: string;
   
};

export const ordersAPI = createApi({
  reducerPath: "ordersAPI",
  baseQuery: fetchBaseQuery({ baseUrl: ApiDomain }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrders: builder.query<TypeOrder[], void>({
      query: () => "/orders",
      providesTags: ["Order"],
    }),
    createOrder: builder.mutation<TypeOrder, CreateOrderPayload>({
      query: (newOrder) => ({
        url: "/orders",
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: ["Order"],
    }),
    updateOrderDetails: builder.mutation<
      TypeOrder,
      { id: number; Status: string; DeliveryDate: string }
    >({
      query: ({ id, Status, DeliveryDate }) => ({
        url: `/order/${id}`,
        method: "PATCH",
        body: { Status, DeliveryDate },
      }),
      invalidatesTags: ["Order"],
    }),
    deleteOrder: builder.mutation<{ success: boolean; Id: number }, number>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderDetailsMutation,
  useDeleteOrderMutation,
} = ordersAPI;

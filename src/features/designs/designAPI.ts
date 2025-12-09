import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";

export type TypeDesign = {
  designId: number;
  name: string;
  description: string;
  baseFlavor: string;
  size: string;
  basePrice: number;
  imageUrl: string;
  category: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
};

export const designsAPI = createApi({
  reducerPath: "designsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: ApiDomain }),
  tagTypes: ["Design"],
  endpoints: (builder) => ({
    getDesigns: builder.query<TypeDesign[], void>({
      query: () => "/designs",
      transformResponse: (response: any[]) => 
        response.map((design) => ({
          designId: design.DesignID,
          name: design.DesignName,
          description: design.Description,
          baseFlavor: design.BaseFlavor,
          size: design.Size,
          basePrice: design.BasePrice,
          imageUrl: design.ImageUrl,
          category: design.Category,
          available: design.Availability,
          createdAt: design.CreatedAt,
          updatedAt: design.UpdatedAt,
        })),
      providesTags: ["Design"],
    }),
    createDesign: builder.mutation<TypeDesign, Partial<TypeDesign>>({
      query: (newDesign) => ({
        url: "/designs",
        method: "POST",
        body: newDesign,
      }),
      invalidatesTags: ["Design"],
    }),
    updateDesign: builder.mutation<TypeDesign, Partial<TypeDesign> & { designId: number }>({
      query: (design) => ({
        url: `/designs/${design.designId}`,
        method: "PATCH",
        body: design,
      }),
      invalidatesTags: ["Design"],
    }),
    deleteDesign: builder.mutation<{ success: boolean; designId: number }, number>({
      query: (designId) => ({
        url: `/designs/${designId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Design"],
    }),
  }),
});

export const {
  useGetDesignsQuery,
  useCreateDesignMutation,
  useUpdateDesignMutation,
  useDeleteDesignMutation,
} = designsAPI;

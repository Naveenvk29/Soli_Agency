import { SOILS_URL } from "../constant";
import { apiSlice } from "./apiSlice";

const soilApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSoil: builder.query({
      query: () => ({
        url: SOILS_URL,
        method: "GET",
      }),
    }),
    createSoil: builder.mutation({
      query: (soil) => ({
        url: SOILS_URL,
        method: "POST",
        body: soil,
      }),
    }),
    updateSoil: builder.mutation({
      query: (id, soil) => ({
        url: `${SOILS_URL}/${id}`,
        method: "PUT",
        body: soil,
      }),
    }),
    deleteSoil: builder.mutation({
      query: (id) => ({
        url: `${SOILS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    getSoilById: builder.query({
      query: (id) => ({
        url: `${SOILS_URL}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetSoilQuery,
  useCreateSoilMutation,
  useUpdateSoilMutation,
  useDeleteSoilMutation,
  useGetSoilByIdQuery,
} = soilApi;

import { DISTRIBUTORS_URL } from "../constant";
import { apiSlice } from "./apiSlice";

const distributorsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDistributors: builder.query({
      query: () => ({
        url: `${DISTRIBUTORS_URL}`,
        method: "GET",
      }),
    }),
    getDistributorById: builder.query({
      query: (id) => ({
        url: `${DISTRIBUTORS_URL}/${id}`,
        method: "GET",
      }),
    }),
    createDistributor: builder.mutation({
      query: (body) => ({
        url: `${DISTRIBUTORS_URL}`,
        method: "POST",
        body: body,
      }),
    }),
    updateDistributor: builder.mutation({
      query: (id, body) => ({
        url: `${DISTRIBUTORS_URL}/${id}`,
        method: "PUT",
        body: body,
      }),
    }),
    deleteDistributor: builder.mutation({
      query: (id) => ({
        url: `${DISTRIBUTORS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetDistributorsQuery,
  useGetDistributorByIdQuery,
  useCreateDistributorMutation,
  useUpdateDistributorMutation,
  useDeleteDistributorMutation,
} = distributorsApi;

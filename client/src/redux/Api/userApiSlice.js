import { apiSlice } from "./apiSlice";
import { USER_URL } from "../constant";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      url: `${USER_URL}`,
      method: "GET",
    }),
    regitation: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: `${USER_URL}/profile`,
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getuserByid: builder.query({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useRegitationMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetUserByIdQuery,
} = userApiSlice;

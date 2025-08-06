import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { TeamEndPoint } from "../../Api/GlobalData";
import Cookies from "js-cookie";


export const TeamApi = createApi({
  reducerPath: "TeamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("Token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Team"],
  endpoints: (builder) => ({
    getAllTeam: builder.query({
      query: (query) => `${TeamEndPoint}?${query}`,
      providesTags: ["Team"],
    }),

    getOneTeam: builder.query({
      query: (id) => `${TeamEndPoint}/${id}`,
      providesTags: ["Team"],
    }),

    createTeam: builder.mutation({
      query: (data) => ({
        url: `${TeamEndPoint}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Team"],
    }),

    updateTeam: builder.mutation({
      query: ({ id, patch }) => ({
        url: `${TeamEndPoint}/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Team"],
    }),

    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `${TeamEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Team"],
    }),
  }),
});

export const {
  useCreateTeamMutation,
  useDeleteTeamMutation,
  useGetAllTeamQuery,
  useGetOneTeamQuery,
  useUpdateTeamMutation,
} = TeamApi;

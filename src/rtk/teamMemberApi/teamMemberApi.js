import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { TeamMemberEndPoint } from "../../Api/GlobalData";
import Cookies from "js-cookie";

export const TeamMemberApi = createApi({
  reducerPath: "TeamMemberApi",
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
  tagTypes: ["TeamMember"],
  endpoints: (builder) => ({
    getAllTeamMember: builder.query({
      query: (query) => `${TeamMemberEndPoint}?${query}`,
      providesTags: ["TeamMember"],
    }),

    getOneTeamMember: builder.query({
      query: (id) => `${TeamMemberEndPoint}/${id}`,
      providesTags: ["TeamMember"],
    }),

    createTeamMember: builder.mutation({
      query: (data) => ({
        url: `${TeamMemberEndPoint}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["TeamMember"],
    }),

    updateTeamMember: builder.mutation({
      query: ({ id, patch }) => ({
        url: `${TeamMemberEndPoint}/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["TeamMember"],
    }),

    deleteTeamMember: builder.mutation({
      query: (id) => ({
        url: `${TeamMemberEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TeamMember"],
    }),
  }),
});

export const {
  useCreateTeamMemberMutation,
  useDeleteTeamMemberMutation,
  useGetAllTeamMemberQuery,
  useGetOneTeamMemberQuery,
  useUpdateTeamMemberMutation,
} = TeamMemberApi;

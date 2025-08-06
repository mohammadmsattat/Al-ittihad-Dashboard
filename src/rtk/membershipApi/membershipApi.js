import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { MembershipEndPoint } from "../../Api/GlobalData";
import Cookies from "js-cookie";

export const MembershipApi = createApi({
  reducerPath: "MembershipApi",
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
  tagTypes: ["Membership"],
  endpoints: (builder) => ({
    getAllMembership: builder.query({
      query: (query) => `${MembershipEndPoint}?${query}`,
      providesTags: ["Membership"],
    }),

    getOneMembership: builder.query({
      query: (id) => `${MembershipEndPoint}/${id}`,
      providesTags: ["Membership"],
    }),

    createMembership: builder.mutation({
      query: (data) => ({
        url: `${MembershipEndPoint}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Membership"],
    }),

    updateMembership: builder.mutation({
      query: ({ id, patch }) => ({
        url: `${MembershipEndPoint}/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Membership"],
    }),

    deleteMembership: builder.mutation({
      query: (id) => ({
        url: `${MembershipEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Membership"],
    }),
  }),
});

export const {
  useCreateMembershipMutation,
  useDeleteMembershipMutation,
  useGetAllMembershipQuery,
  useGetOneMembershipQuery,
  useUpdateMembershipMutation,
} = MembershipApi;

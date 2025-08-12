import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { MatchEndPoint } from "../../Api/GlobalData";
import Cookies from "js-cookie";

export const MatchApi = createApi({
  reducerPath: "MatchApi",
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
  tagTypes: ["Match"],
  endpoints: (builder) => ({
    getAllMatch: builder.query({
      query: (query) => `${MatchEndPoint}?${query}`,
      providesTags: ["Match"],
    }),

    getOneMatch: builder.query({
      query: (id) => `${MatchEndPoint}/${id}`,
      providesTags: ["Match"],
    }),

    createMatch: builder.mutation({
      query: (data) => ({
        url: `${MatchEndPoint}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Match"],
    }),

    updateMatch: builder.mutation({
      query: ({ id, data }) => ({
        url: `${MatchEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Match"],
    }),

    deleteMatch: builder.mutation({
      query: (id) => ({
        url: `${MatchEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Match"],
    }),

    importMatchTable: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: `${MatchEndPoint}/matchTable`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Match"],
    }),
  }),
});

export const {
  useCreateMatchMutation,
  useDeleteMatchMutation,
  useGetAllMatchQuery,
  useGetOneMatchQuery,
  useUpdateMatchMutation,
  useImportMatchTableMutation,  
} = MatchApi;

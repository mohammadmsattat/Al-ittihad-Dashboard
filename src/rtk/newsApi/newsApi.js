import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { NewsEndPoint } from "../../Api/GlobalData";
import Cookies from "js-cookie";

export const NewsApi = createApi({
  reducerPath: "NewsApi",
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
  tagTypes: ["News"],
  endpoints: (builder) => ({
    getAllNews: builder.query({
      query: (query) => `${NewsEndPoint}?${query}`,
      providesTags: ["News"],
    }),

    getOneNews: builder.query({
      query: (id) => `${NewsEndPoint}/${id}`,
      providesTags: ["News"],
    }),

    createNews: builder.mutation({
      query: (formDataToSend) => ({
        url: `${NewsEndPoint}`,
        method: "POST",
        body: formDataToSend,
      }),
      invalidatesTags: ["News"],
    }),

    updateNews: builder.mutation({
      query: ({ id, data }) => ({
        url: `${NewsEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["News"],
    }),

    DeleteNews: builder.mutation({
      query: (id) => ({
        url: `${NewsEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["News"],
    }),
  }),
});

export const {
  useGetAllNewsQuery,
  useGetOneNewsQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = NewsApi;

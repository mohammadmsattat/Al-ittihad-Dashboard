import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { InvestmentEndPoint } from "../../Api/GlobalData";
import Cookies from "js-cookie";

export const InvsetmentApi = createApi({
  reducerPath: "InvsetmentApi",
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
  tagTypes: ["Investment"],
  endpoints: (builder) => ({
    getAllInvestment: builder.query({
      query: (query) => `${InvestmentEndPoint}?${query}`,
      providesTags: ["Investment"],
    }),

    getOneInvestment: builder.query({
      query: (id) => `${InvestmentEndPoint}/${id}`,
      providesTags: ["Investment"],
    }),

    createInvestment: builder.mutation({
      query: (data) => ({
        url: `${InvestmentEndPoint}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Investment"],
    }),

    updateInvestment: builder.mutation({
      query: ({ id, data }) => ({
        url: `${InvestmentEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Investment"],
    }),

    deleteInvestment: builder.mutation({
      query: (id) => ({
        url: `${InvestmentEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Investment"],
    }),
  }),
});

export const {
  useCreateInvestmentMutation,
  useDeleteInvestmentMutation,
  useGetAllInvestmentQuery,
  useGetOneInvestmentQuery,
  useUpdateInvestmentMutation,
} = InvsetmentApi;

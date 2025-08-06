import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { ContactEndPoint } from "../../Api/GlobalData";
import Cookies from "js-cookie";

export const ContactApi = createApi({
  reducerPath: "ContactApi",
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
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    getAllContact: builder.query({
      query: (query) => `${ContactEndPoint}?${query}`,
      providesTags: ["Contact"],
    }),

    getOneContact: builder.query({
      query: (id) => `${ContactEndPoint}/${id}`,
      providesTags: ["Contact"],
    }),

    createContact: builder.mutation({
      query: (data) => ({
        url: `${ContactEndPoint}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contact"],
    }),

    updateContact: builder.mutation({
      query: ({ id, patch }) => ({
        url: `${ContactEndPoint}/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Contact"],
    }),

    deleteContact: builder.mutation({
      query: (id) => ({
        url: `${ContactEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useCreateContactMutation,
  useDeleteContactMutation,
  useGetAllContactQuery,
  useGetOneContactQuery,
  useUpdateContactMutation,
} = ContactApi;

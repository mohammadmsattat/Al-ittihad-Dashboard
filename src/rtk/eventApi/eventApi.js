import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { EventEndPoint } from "../../Api/GlobalData";
import Cookies from "js-cookie";

export const EventApi = createApi({
  reducerPath: "EventApi",
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
  tagTypes: ["Event"],
  endpoints: (builder) => ({
    getAllEvent: builder.query({
      query: (query) => `${EventEndPoint}?${query}`,
      providesTags: ["Event"],
    }),

    getOneEvent: builder.query({
      query: (id) => `${EventEndPoint}/${id}`,
      providesTags: ["Event"],
    }),

    createEvent: builder.mutation({
      query: (data) => ({
        url: `${EventEndPoint}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Event"],
    }),

    updateEvent: builder.mutation({
      query: ({ id, data }) => ({
        url: `${EventEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Event"],
    }),

    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `${EventEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Event"],
    }),
  }),
});

export const {
  useCreateEventMutation,
  useDeleteEventMutation,
  useGetAllEventQuery,
  useGetOneEventQuery,
  useUpdateEventMutation,
} = EventApi;

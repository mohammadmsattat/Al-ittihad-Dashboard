import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { LogInEndPoint } from "../../Api/GlobalData";


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,

  }),
  tagTypes: ["Auth"], // Define the tag type
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (logInData) => ({
        url: `${LogInEndPoint}`,
        method: "POST",
        body: logInData,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useLogInMutation } = authApi;

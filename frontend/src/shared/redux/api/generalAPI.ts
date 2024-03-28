// React-specific entry point to allow generating React hooks
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const generalAPI: any = createApi({
  reducerPath: "generalAPI",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    userSignIn: builder.mutation({
      query: ({ email, password }: { email: string; password: string }) => ({
        url: "/api/users/login",
        method: "POST",
        body: { email, password },
      }),
    }),

    hotelAdd: builder.mutation({
      query: (formData: FormData) => ({
        url: "/api/hotels",
        method: "POST",
        body: formData,
      }),
    }),

    getUsers: builder.query({
      query: () => ({
        url: "/api/users",
        method: "GET",
      }),
    }),
  }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useUserSignInMutation, useHotelAddMutation, useGetUsersQuery } =
  generalAPI;

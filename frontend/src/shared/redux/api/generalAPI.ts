// React-specific entry point to allow generating React hooks
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const generalAPI: any = createApi({
  reducerPath: "generalAPI",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Hotels"],
  endpoints: (builder) => ({
    userSignIn: builder.mutation({
      query: ({ email, password }: { email: string; password: string }) => ({
        url: "/api/users/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    userSignUp: builder.mutation({
      query: ({
        email,
        password,
        name,
        contactPhone,
      }: {
        email: string;
        password: string;
        name: string;
        contactPhone: string;
      }) => ({
        url: "/api/client/register",
        method: "POST",
        body: { email, password, name, contactPhone },
      }),
    }),

    hotelGetList: builder.query({
      query: () => ({
        url: "/api/hotels",
        method: "GET",
      }),
      providesTags: ["Hotels"],
    }),
    hotelGetItem: builder.query({
      query: (id) => ({
        url: `/api/hotels/${id}`,
        method: "GET",
      }),
      providesTags: ["Hotels"],
    }),
    hotelAdd: builder.mutation({
      query: (formData: FormData) => ({
        url: "/api/admin/hotels",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Hotels"],
    }),
    hotelUpdate: builder.mutation({
      query: ({ formData, id }: { formData: FormData; id: string }) => ({
        url: `/api/admin/hotels/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Hotels"],
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
export const {
  useUserSignInMutation,
  useUserSignUpMutation,
  useHotelGetListQuery,
  useHotelGetItemQuery,
  useHotelAddMutation,
  useHotelUpdateMutation,
  useGetUsersQuery,
} = generalAPI;

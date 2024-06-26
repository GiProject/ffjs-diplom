// React-specific entry point to allow generating React hooks
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const generalAPI: any = createApi({
  reducerPath: "generalAPI",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Hotel", "Hotels", "Rooms", "Bookings", "Users"],
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
      query: ({
        dateStart,
        dateEnd,
        title,
      }: {
        dateStart?: string;
        dateEnd?: string;
        title?: string;
      }) => ({
        url: `/api/hotels?dateStart=${dateStart ?? ""}&dateEnd=${
          dateEnd ?? ""
        }&title=${title ?? ""}`,
        method: "GET",
      }),
      providesTags: ["Hotels"],
    }),
    hotelGetItem: builder.query({
      query: (id) => ({
        url: `/api/hotels/${id}`,
        method: "GET",
      }),
      providesTags: ["Hotel", "Hotels"],
    }),
    hotelDelete: builder.mutation({
      query: (id) => ({
        url: `/api/admin/hotels/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Hotels"],
    }),

    hotelGetRooms: builder.query({
      query: (id) => ({
        url: `/api/common/hotel-rooms?hotel=${id}`,
        method: "GET",
      }),
      providesTags: ["Rooms"],
    }),
    hotelGetRoom: builder.query({
      query: (id) => ({
        url: `/api/common/hotel-rooms/${id}`,
        method: "GET",
      }),
    }),
    roomDelete: builder.mutation({
      query: (id) => ({
        url: `/api/hotels/rooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Rooms"],
    }),

    hotelAdd: builder.mutation({
      query: (formData: FormData) => ({
        url: "/api/admin/hotels",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Hotels"],
    }),
    hotelAddRoom: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/api/hotels/${id}/rooms`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Rooms"],
    }),
    hotelUpdate: builder.mutation({
      query: ({ formData, id }: { formData: FormData; id: string }) => ({
        url: `/api/admin/hotels/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Hotel", "Hotels"],
    }),
    roomUpdate: builder.mutation({
      query: ({ formData, id }: { formData: FormData; id: string }) => ({
        url: `/api/hotels/rooms/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Rooms"],
    }),

    getUsers: builder.query({
      query: () => ({
        url: "/api/users",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    //Reservations
    bookRoom: builder.mutation({
      query: ({ dateStart, dateEnd, roomId }) => ({
        url: `/api/client/reservations`,
        method: "POST",
        body: {
          dateStart,
          dateEnd,
          roomId,
        },
      }),
    }),
    bookingsList: builder.query({
      query: () => ({
        url: `/api/client/reservations/`,
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),
    bookingDeleteClient: builder.mutation({
      query: (bookingId) => ({
        url: `/api/client/reservations/${bookingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookings"],
    }),

    bookingsListManager: builder.query({
      query: (userId: string) => ({
        url: `/api/manager/reservations/${userId}`,
        method: "GET",
      }),
      providesTags: ["Bookings"],
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
  useHotelDeleteMutation,
  useHotelGetRoomQuery,
  useHotelGetRoomsQuery,
  useHotelAddMutation,
  useHotelAddRoomMutation,
  useHotelUpdateMutation,
  useRoomDeleteMutation,
  useRoomUpdateMutation,
  useGetUsersQuery,
  useBookRoomMutation,
  useBookingsListQuery,
  useBookingDeleteClientMutation,
  useBookingsListManagerQuery,
} = generalAPI;

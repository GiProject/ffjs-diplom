// React-specific entry point to allow generating React hooks
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const generalAPI: any = createApi({
  reducerPath: "generalAPI",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {} = generalAPI;

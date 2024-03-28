// React-specific entry point to allow generating React hooks
import { BaseQueryApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { logout, setAccessToken } from "@/shared/redux/auth/authSlice";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
const mutex = new Mutex();

export type BaseQueryFn<
  Args = any,
  Result = unknown,
  Error = unknown,
  DefinitionExtraOptions = {},
  Meta = {}
> = (
  args: Args,
  api: BaseQueryApi,
  extraOptions: DefinitionExtraOptions
) => MaybePromise<QueryReturnValue<Result, Error, Meta>>;

const baseUrl = `${process.env.BASE_URL}`;

const baseQueryWithAuth = fetchBaseQuery({
  // base url of backend API
  baseUrl: baseUrl,
  // prepareHeaders is used to configure the header of every request and gives access to getState which we use to include the token from the store
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = (getState() as any).auth.userToken;
    const refresh = (getState() as any).auth.refreshToken;
    if (token && refresh) {
      // include token in req header
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    }
  },
});

export const baseQueryWithReauth: BaseQueryFn = async (
  args,
  api,
  extraOptions
) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQueryWithAuth(args, api, extraOptions);

  //If user not found, log out
  //@ts-ignore
  if (result?.error?.data?.error?.code === 100) {
    api.dispatch(logout());
  }
  //If 401 unauthorized, send refresh token in headers
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQueryWithAuth(
          { url: `/auth/get_access_token_by_refresh_token`, method: "GET" },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const refreshResultData = refreshResult.data; //as any
          // Store the new token
          api.dispatch(setAccessToken(refreshResultData));
          result = await baseQueryWithAuth(args, api, extraOptions);
        } else {
          //If there's no refresh token data, log the user out
          api.dispatch(logout());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQueryWithAuth(args, api, extraOptions);
    }
  }
  return result;
};

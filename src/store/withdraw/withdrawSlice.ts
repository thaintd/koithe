import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Withdraw } from "../../types/withdraw";

export const withdrawApi = createApi({
  reducerPath: "withdrawApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getWithdrawList: builder.query<Withdraw[], void>({
      query: () => "/withdraws"
    }),
    changeWithdrawStatus: builder.mutation<void, { withdrawId: string; status: string }>({
      query: ({ withdrawId, status }) => ({
        url: `/withdraws/${withdrawId}`,
        method: "DELETE", // Using DELETE method
        body: { status } // Sending status in the body
      })
    })
  })
});

// Export hooks for usage in functional components
export const { useGetWithdrawListQuery, useChangeWithdrawStatusMutation } = withdrawApi;

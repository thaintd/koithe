import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BankAccount } from "../../types/bankAccount";

export const bankAccountApi = createApi({
  reducerPath: "bankAccountApi",
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
    getBankAccountList: builder.query<BankAccount[], void>({
      query: () => "/bankAccounts"
    }),
    changeBankAccountStatus: builder.mutation<void, { accountId: string; status: "Active" | "Inactive" }>({
      query: ({ accountId, status }) => ({
        url: `/bankAccounts/${accountId}`,
        method: "DELETE", // Use DELETE method for changing status
        body: { status }
      })
    })
  })
});

// Export hooks for usage in functional components
export const { useGetBankAccountListQuery, useChangeBankAccountStatusMutation } = bankAccountApi;

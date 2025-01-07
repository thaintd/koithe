import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ConsignmentCare } from "../../types/product";

export const consignmentCareApi = createApi({
  reducerPath: "consignmentCareApi",
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
    getConsignmentCareList: builder.query<ConsignmentCare[], void>({
      query: () => "/consignment_care"
    }),
    changeConsignmentCareStatus: builder.mutation<void, { consignmentCareId: string; status: "Care" | "Returned" }>({
      query: ({ consignmentCareId, status }) => ({
        url: `/consignment_care/change_status/${consignmentCareId}`,
        method: "PUT",
        body: { status }
      })
    })
  })
});

export const { useGetConsignmentCareListQuery, useChangeConsignmentCareStatusMutation } = consignmentCareApi;

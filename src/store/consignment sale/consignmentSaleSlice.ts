import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ConsignmentSale } from "../../types/product";

export const consignmentSaleApi = createApi({
  reducerPath: "consignmentSaleApi",
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
    getConsignmentSaleList: builder.query<ConsignmentSale[], void>({
      query: () => "/consignment_sale"
    }),
    changeInspectionStatus: builder.mutation<void, { consignmentSaleId: string; inspectionStatus: "Pending" | "Passed" | "Failed" }>({
      query: ({ consignmentSaleId, inspectionStatus }) => ({
        url: `/consignment_sale/change_inspection_status/${consignmentSaleId}`,
        method: "PUT",
        body: { inspectionStatus }
      })
    }),
    changeStatus: builder.mutation<void, { consignmentSaleId: string; status: "Pending" | "Active" | "Sold" | "Cancelled" }>({
      query: ({ consignmentSaleId, status }) => ({
        url: `/consignment_sale/change_status/${consignmentSaleId}`,
        method: "PUT",
        body: { status }
      })
    })
  })
});

export const { useGetConsignmentSaleListQuery, useChangeInspectionStatusMutation, useChangeStatusMutation } = consignmentSaleApi;

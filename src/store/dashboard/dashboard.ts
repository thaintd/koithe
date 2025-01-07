import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DashboardData } from "../../types/type";
export const dashboardSlice = createApi({
  reducerPath: "dashboardapi",
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
    getDashboardData: builder.query<DashboardData, void>({
      query: () => "/dashboard"
    })
  })
});

export const { useGetDashboardDataQuery } = dashboardSlice;

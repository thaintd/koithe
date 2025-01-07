import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Coupon } from "../../types/type";

// Tạo slice API với RTK Query
export const couponSlice = createApi({
  reducerPath: "api",
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
    getAllCoupon: builder.query<Coupon[], void>({
      query: () => "/coupons"
    }),
    createCoupon: builder.mutation<Coupon, Partial<Coupon>>({
      query: (newCoupon) => ({
        url: "/coupons",
        method: "POST",
        body: newCoupon
      })
    }),
    editCoupon: builder.mutation<Coupon, { id: string; coupon: Partial<Coupon> }>({
      query: ({ id, coupon }) => ({
        url: `/coupons/${id}`,
        method: "PUT",
        body: coupon
      })
    })
  })
});

// Export các hook để sử dụng trong các component
export const { useGetAllCouponQuery, useCreateCouponMutation, useEditCouponMutation } = couponSlice;

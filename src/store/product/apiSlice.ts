import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Order } from "../../types/order";
import { Product } from "../../types/product";

// Tạo slice API với RTK Query
export const apiSlice = createApi({
  reducerPath: "productapi",
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
    getOrders: builder.query<Order[], void>({
      query: () => "/orders"
    }),
    getProducts: builder.query<Product[], void>({
      query: () => "/products"
    }),
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product
      })
    }),
    updateProduct: builder.mutation<Product, { id: string; product: Partial<Product> }>({
      query: ({ id, product }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: product
      })
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE"
      })
    })
  })
});

export const { useGetOrdersQuery, useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } = apiSlice;

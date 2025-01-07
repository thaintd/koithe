import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category } from "../../types/product";

// Tạo slice API với RTK Query
export const categorySlice = createApi({
  reducerPath: "categoryapi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getAllCategory: builder.query<Category[], void>({
      query: () => "/categories"
    })
  })
});

export const { useGetAllCategoryQuery } = categorySlice;

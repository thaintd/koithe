import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Genotype } from "../../types/product";

// Tạo slice API với RTK Query
export const genotypeSlice = createApi({
  reducerPath: "genotypeapi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getAllGenotype: builder.query<Genotype[], void>({
      query: () => "/genotypes"
    })
  })
});

export const { useGetAllGenotypeQuery } = genotypeSlice;

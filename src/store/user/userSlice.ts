import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/type";

// Tạo slice API với RTK Query
export const userSlice = createApi({
  reducerPath: "userapi",
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
    getUsers: builder.query<User[], void>({
      query: () => "/users"
    }),
    login: builder.mutation<{ message: string; token: string }, { username: string; password: string }>({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body: body
      })
    }),
    getCustomers: builder.query<User[], void>({
      query: () => "/users/customer"
    }),
    changeUserStatus: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE"
      })
    })
  })
});

// Export các hook để sử dụng trong các component
export const { useGetUsersQuery, useLoginMutation, useGetCustomersQuery, useChangeUserStatusMutation } = userSlice;

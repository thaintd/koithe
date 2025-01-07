import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { userSlice } from "./user/userSlice";
import { apiSlice } from "./product/apiSlice";
import { couponSlice } from "./coupon/couponSlice";
import { categorySlice } from "./category/categorySlide";
import { genotypeSlice } from "./genotype/genotype";
import { dashboardSlice } from "./dashboard/dashboard";
import { consignmentCareApi } from "./consignment care/consignmentCareSlice";
import { consignmentSaleApi } from "./consignment sale/consignmentSaleSlice";
import { withdrawApi } from "./withdraw/withdrawSlice";
import { bankAccountApi } from "./bank/bankSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, // Thêm auth reducer
    [userSlice.reducerPath]: userSlice.reducer,
    [couponSlice.reducerPath]: couponSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [categorySlice.reducerPath]: categorySlice.reducer,
    [genotypeSlice.reducerPath]: genotypeSlice.reducer,
    [dashboardSlice.reducerPath]: dashboardSlice.reducer,
    [consignmentCareApi.reducerPath]: consignmentCareApi.reducer,
    [consignmentSaleApi.reducerPath]: consignmentSaleApi.reducer,
    [withdrawApi.reducerPath]: withdrawApi.reducer,
    [bankAccountApi.reducerPath]: bankAccountApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userSlice.middleware, couponSlice.middleware, apiSlice.middleware, categorySlice.middleware, genotypeSlice.middleware, dashboardSlice.middleware, consignmentCareApi.middleware, consignmentSaleApi.middleware, withdrawApi.middleware, bankAccountApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

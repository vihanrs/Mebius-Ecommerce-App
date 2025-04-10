import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: async (headers, { getState }) => {
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/api/v1/products`,
    }),
    getFeaturedProducts: builder.query({
      query: () => `/api/v1/products/featured`,
    }),
    getCategories: builder.query({
      query: () => `/api/v1/categories`,
    }),
    getOrder: builder.query({
      query: (id) => `/api/v1/orders/${id}`,
    }),
    getSingleProduct: builder.query({
      query: (id) => `/api/v1/products/${id}`,
    }),
    createOrder: builder.mutation({
      query: (body) => ({
        url: `/api/v1/orders`,
        method: "POST",
        body,
      }),
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: `/api/v1/products`,
        method: "POST",
        body,
      }),
    }),
    getOrdersByUser: builder.query({
      query: () => `/api/v1/orders/user`,
    }),
    validatePromoCode: builder.mutation({
      query: (code) => ({
        url: "/api/v1/promocodes/validate",
        method: "POST",
        body: { code },
      }),
    }),
    createCheckoutSession: builder.mutation({
      query: () => ({
        url: `/api/v1/payments/create-checkout-session`,
        method: "POST",
      }),
    }),
    getCheckoutSessionStatus: builder.query({
      query: (sessionId) =>
        `/api/v1/payments/session-status?session_id=${sessionId}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductsQuery,
  useGetFeaturedProductsQuery,
  useGetCategoriesQuery,
  useGetSingleProductQuery,
  useCreateOrderMutation,
  useGetOrderQuery,
  useGetOrdersByUserQuery,
  useCreateProductMutation,
  useValidatePromoCodeMutation,
  useCreateCheckoutSessionMutation,
  useGetCheckoutSessionStatusQuery,
} = Api;

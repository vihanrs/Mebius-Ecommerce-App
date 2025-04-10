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
      query: () => `products`,
    }),
    getFeaturedProducts: builder.query({
      query: () => `products/featured`,
    }),
    getCategories: builder.query({
      query: () => `categories`,
    }),
    getOrder: builder.query({
      query: (id) => `orders/${id}`,
    }),
    getSingleProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),
    createOrder: builder.mutation({
      query: (body) => ({
        url: `orders`,
        method: "POST",
        body,
      }),
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: `products`,
        method: "POST",
        body,
      }),
    }),
    getOrdersByUser: builder.query({
      query: () => `orders/user`,
    }),
    validatePromoCode: builder.mutation({
      query: (code) => ({
        url: "/promocodes/validate",
        method: "POST",
        body: { code },
      }),
    }),
    createCheckoutSession: builder.mutation({
      query: () => ({
        url: `payments/create-checkout-session`,
        method: "POST",
      }),
    }),
    getCheckoutSessionStatus: builder.query({
      query: (sessionId) => `payments/session-status?session_id=${sessionId}`,
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

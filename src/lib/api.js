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
      query: () => `/api/v1/products?&tag=featured&status=active`,
    }),
    getCategories: builder.query({
      query: () => `/api/v1/categories`,
    }),
    getPromoCodes: builder.query({
      query: () => `/api/v1/promocodes`,
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
    createCategory: builder.mutation({
      query: (body) => ({
        url: `/api/v1/categories`,
        method: "POST",
        body,
      }),
    }),
    createPromocode: builder.mutation({
      query: (body) => ({
        url: `/api/v1/promocodes`,
        method: "POST",
        body,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/api/v1/categories/${id}`,
        method: "PUT",
        body,
      }),
    }),
    updateCategoryStatus: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `/api/v1/categories/${id}/status?status=${isActive}`,
        method: "PUT",
      }),
    }),
    updatePromocode: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/api/v1/promocodes/${id}`,
        method: "PUT",
        body,
      }),
    }),
    updatePromocodeStatus: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `/api/v1/promocodes/${id}/status?status=${isActive}`,
        method: "PUT",
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
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useUpdateCategoryStatusMutation,
  useGetPromoCodesQuery,
  useCreatePromocodeMutation,
  useUpdatePromocodeMutation,
  useUpdatePromocodeStatusMutation,
} = Api;

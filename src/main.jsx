import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { store } from "@/lib/store";
import { Provider } from "react-redux";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";

import Protected from "@/layouts/Protected";
import AdminProtected from "@/layouts/AdminProtected";

import CartPage from "./pages/cart.page";
import CheckoutPage from "./pages/checkout.page";
import HomePage from "./pages/home/home.page";
import SignInPage from "./pages/sign-in.page";
import SignUpPage from "./pages/sign-up.page";

import MainLayout from "./layouts/main.layout";
import RootLayout from "./layouts/root.layout";
import AccountPage from "./pages/account.page";
import CompletePage from "./pages/complete.page";
import PaymentPage from "./pages/payment.page";

import AdminProductCreatePage from "./pages/admin-product-create.page";
import ShopPage from "./pages/shop.page";
import ProductDetails from "@/pages/ProductDetails";
import MyOrdersPage from "./pages/my.orders.page";
import SavedItemsPage from "./pages/saved.items.page";
import OrderDetails from "./pages/order.details";
import Dashboard from "./pages/admin/dashboard.page";
import CategoryManagement from "./pages/admin/manage.categories.page";
import PromocodeManagement from "./pages/admin/manage.promocodes.page";
import ProductManagement from "./pages/admin/manage.products.page";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env.local file");
}

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:productId" element={<ProductDetails />} />
              {/* The Protected layout can be used to wrap routes that needs to be logged in to access */}
              <Route element={<Protected />}>
                <Route path="/shop/cart" element={<CartPage />} />
                <Route path="/shop/saved" element={<SavedItemsPage />} />
                <Route path="/shop/checkout" element={<CheckoutPage />} />
                <Route path="/shop/payment" element={<PaymentPage />} />
                <Route path="/shop/complete" element={<CompletePage />} />
                <Route path="/shop/order-details" element={<OrderDetails />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/my-orders" element={<MyOrdersPage />} />

                {/* The AdminProtected layout can be used to wrap routes that needs to be logged in as admin to access */}
                <Route element={<AdminProtected />}>
                  <Route
                    path="/admin/products/new"
                    element={<AdminProductCreatePage />}
                  />
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route
                    path="/admin/categories"
                    element={<CategoryManagement />}
                  />
                  <Route
                    path="/admin/promocodes"
                    element={<PromocodeManagement />}
                  />
                  <Route
                    path="/admin/products"
                    element={<ProductManagement />}
                  />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </ClerkProvider>
  // </StrictMode>
);

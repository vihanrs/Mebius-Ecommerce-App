import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";

function RootLayout() {
  return (
    <>
      <Outlet />
      <Toaster
        toastOptions={{
          className: "bg-white border-l-4  text-gray-800 shadow-md rounded-md",
          success: {
            className: "bg-green-100 border-green-200 text-green-900",
          },
          error: {
            className: "bg-red-100 border-red-200 text-red-900",
          },
        }}
      />
    </>
  );
}

export default RootLayout;

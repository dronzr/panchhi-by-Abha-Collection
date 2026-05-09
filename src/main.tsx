import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { CartProvider } from "@/lib/cart";  // ← add this
import { Toaster } from "sonner";           // ← add this too (you use toast())

import { routeTree } from "./routeTree.gen";
import "./styles.css";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <CartProvider>          {/* ← wrap here */}
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </CartProvider>
    </React.StrictMode>
  );
}
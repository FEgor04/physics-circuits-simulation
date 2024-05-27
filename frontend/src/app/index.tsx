// eslint-disable-next-line @conarti/feature-sliced/public-api
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "@/shared/ui/sonner";
import { routeTree } from "@/routeTree.gen";

const queryClient = new QueryClient();

const router = createRouter({ routeTree, context: { queryClient } });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="bottom-center" richColors />
    </QueryClientProvider>
  </React.StrictMode>,
);

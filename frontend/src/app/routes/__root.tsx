import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Header } from "@/widgets/header";

export const Route = createRootRoute({
  component: () => {
    const hideHeader = location.pathname.includes("/embed");
    return (
      <>
        {!hideHeader && <Header />}
        <Outlet />
        {import.meta.env.DEV && !hideHeader && <TanStackRouterDevtools />}
        {import.meta.env.DEV && !hideHeader && <ReactQueryDevtools />}
      </>
    );
  },
});

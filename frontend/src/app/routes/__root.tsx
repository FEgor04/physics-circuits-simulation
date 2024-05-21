import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Header } from "@/widgets/header";
import { PrincipalDropdownMenu } from "@/widgets/principal-menu";
import { isEmbedded } from "@/shared/embed/utility.ts";

type Context = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<Context>()({
  component: () => {
    const hideHeader = isEmbedded();
    return (
      <>
        {!hideHeader && <Header principalMenu={<PrincipalDropdownMenu />} />}
        <Outlet />
        {import.meta.env.DEV && !hideHeader && <TanStackRouterDevtools />}
        {import.meta.env.DEV && !hideHeader && <ReactQueryDevtools />}
      </>
    );
  },
});

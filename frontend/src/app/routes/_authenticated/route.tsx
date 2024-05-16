import { createFileRoute, redirect } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { getMeQueryOptions } from "@/entities/principal";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    try {
      const me = await context.queryClient.ensureQueryData(getMeQueryOptions());
      console.log(me);
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status == 401) {
        throw redirect({
          to: "/signin",
        });
      }
    }
  },
});


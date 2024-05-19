import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMeQueryOptions } from "@/entities/principal";
import { login, register } from "@/shared/api";
import "./interceptors.ts"; // set up interceptors
import { setSession } from "./interceptors.ts";

export function useSignInByEmailMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await login({
        email,
        password,
      });
      return response.data;
    },
    onSuccess: (response) => {
      setSession(response);
      queryClient.invalidateQueries(getMeQueryOptions());
    },
  });
}

export function useSignUpByEmailMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ email, password, name }: { email: string; password: string; name: string }) => {
      const response = await register({
        name,
        email,
        password,
      });
      return response.data;
    },
    onSuccess: (response) => {
      setSession(response);
      queryClient.invalidateQueries(getMeQueryOptions());
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMeQueryOptions } from "@/entities/principal";
import { login, register } from "@/shared/api";

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
      localStorage.setItem(
        "session",
        JSON.stringify({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        }),
      );
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
      localStorage.setItem(
        "session",
        JSON.stringify({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        }),
      );
      queryClient.invalidateQueries(getMeQueryOptions());
    },
  });
}


import { useMutation } from "@tanstack/vue-query";
import { useAuthStore } from "~/store/auth";
import { queryClient } from "~/utils/query-client";

export const logout = () => useAPI.post("/auth/logout");

export const useLogout = () => {
  const authStore = useAuthStore();

  const {
    error,
    isPending: loading,
    mutateAsync: logoutFn,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      authStore.setUser(null);
      queryClient.setQueryData(["user"], null);
    },
    onError: () => {
      authStore.setUser(null);
      queryClient.setQueryData(["user"], null);
    },
  });

  return { logout: logoutFn, loading, error };
};

import { AuthResponseDto, RegisterDto } from "~/lib/dto";
import { useMutation } from "@tanstack/vue-query";
import { queryClient } from "~/utils/query-client";
import { useAuthStore } from "~/store/auth";

export const register = async (data: RegisterDto) => {
  const response = await useAPI.post<AuthResponseDto>(
    "/resume/user/register",
    data,
  );

  return response.data;
};

export const useRegister = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: registerFn,
  } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      useAuthStore().setUser(data.value.user);
      queryClient.setQueryData(["user"], data.value.user);
    },
  });

  return { register: registerFn, loading, error };
};

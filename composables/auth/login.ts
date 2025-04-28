import { AuthResponseDto, LoginDto } from "~/lib/dto";
import { useMutation } from "@tanstack/vue-query";
import { useAuthStore } from "~/store/auth";
import { useUserInfoStore } from "~/store/user";

export const login = async (data: LoginDto) => {
  const response = await useAPI.post<AuthResponseDto>(
    "/auth/login",
    data,
  );

  return response;
};

export const useLogin = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: loginFn,
  } = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      if (data.status === "2fa_required") {
        await navigateTo("/auth/verify-otp")
        return;
      }

      const { saveUserInfo } = useUserInfoStore();

      saveUserInfo(data.user); // 存储用户信息
      useAuthStore().setUser(data.user);

      const cookie = useCookie('token')
      cookie.value = data.token
      queryClient.setQueryData(["user"], data.user);
    }
  });

  return { login: loginFn, loading, error };
};



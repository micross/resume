import { AuthResponseDto, LoginDto } from "~/lib/dto";
import { useMutation } from "@tanstack/vue-query";
import { fetchMe } from "../users";
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

      const cookie = useCookie('token')
      cookie.value = data.token

      const { setUser } = useUserInfoStore();
      const me  = await fetchMe();
      setUser(me);
    }
  });

  return { login: loginFn, loading, error };
};



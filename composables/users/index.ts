import { useQuery } from "@tanstack/vue-query";
import type { Me } from "~/lib/schema/user";

export const fetchMe = async () => {
    const response = await useAPI.get<Me>("/resume/user/me");
    return response;
};

export const useMe = () => {
    const {
        error,
        isPending: loading,
        data: me,
    } = useQuery({
        queryKey: ["me"],
        queryFn: fetchMe,
    });

    return { me, loading, error };
};
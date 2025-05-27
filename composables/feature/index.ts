
import { useQuery } from "@tanstack/vue-query";
import type { Flags } from "~/lib/schema/flags";

export const fetchFlags = async () => {
    const response = await useAPI.get<Flags>("/resume/feature/flags");
    return response;
};

export const useFlags = () => {
    const {
        error,
        isPending: loading,
        data: flags,
    } = useQuery({
        queryKey: ['flags'],
        queryFn: fetchFlags,
    });

    return { flags, loading, error };
};
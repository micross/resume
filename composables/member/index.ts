import { useQuery } from "@tanstack/vue-query";
import type { MemberType } from "~/lib/schema/member";

export const fetchMemberTypes = async () => {
    const response = await useAPI.get<MemberType[]>("/member-type");
    return response;
};

export const useMemberTypes = () => {
    const {
        error,
        isPending: loading,
        data: memberTypes,
    } = useQuery({
        queryKey: ["member-types"],
        queryFn: fetchMemberTypes,
    });

    return { memberTypes, loading, error };
};
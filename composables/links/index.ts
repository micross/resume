import { useQuery } from "@tanstack/vue-query";
import type { Link } from "~/lib/schema/link";

export const fetchLinks = async () => {
    const response = await useAPI.get<Link[]>("/links");

    return response;
};

export const useLinks = () => {
    const {
        error,
        isPending: loading,
        data: links,
    } = useQuery({
        queryKey: ['links'],
        queryFn: fetchLinks,
    });

    return { links, loading, error };
};

import { useQuery } from "@tanstack/vue-query";
import type { PageDto } from "~/lib/dto";
import type { pptListDto } from "~/lib/dto/ppt";
import type { Category } from "~/lib/schema/categories";
import type { PPT } from "~/lib/schema/ppt";
import type { Tag } from "~/lib/schema/tags";

export const fetchPptTags = async () => {
    const response = await useAPI.get<Tag[]>("/resume/ppts/tags");
    return response;
};

export const usePptTags = () => {
    const {
        error,
        isPending: loading,
        data: tags,
    } = useQuery({
        queryKey: ["ppt_tags"],
        queryFn: () => fetchPptTags(),
    });

    return { tags, loading, error };
};

export const fetchPptCategories = async () => {
    const response = await useAPI.get<Category[]>("/resume/ppts/categories");
    return response;
};

export const usePptCategories = () => {
    const {
        error,
        isPending: loading,
        data: categories,
    } = useQuery({
        queryKey: ["ppt_categories"],
        queryFn: () => fetchPptCategories(),
    });

    return { categories, loading, error };
};

export const fetchPpts = async (data: PageDto) => {
    const response = await useAPI.get<pptListDto>("/resume/ppts", data);
    return response.list;
};

export const usePpts = (data: PageDto) => {
    const {
        error,
        isPending: loadingPpts,
        data: ppts,
    } = useQuery({
        queryKey: ["ppts"],
        queryFn: () => fetchPpts(data),
    });

    return { ppts, loadingPpts, error };
};

export const fetchPptDetail = async (data: { id: string }) => {
    const response = await useAPI.get<PPT>(`/resume/ppts/detail/${data.id}`);
    return response;
};

export const usePptDetail = (id: string) => {
    const {
        error,
        isPending: loading,
        data: ppt,
    } = useQuery({
        queryKey: ["ppts", "id"],
        queryFn: () => fetchPptDetail({id}),
    });

    return { ppt, loading, error };
};

export const fetchPptDownloadUrl = async (data: { id: string }) => {
    const response = await useAPI.get<string>(`/resume/ppts/download/${data.id}`);
    return response;
};

export const usePptDownload = (id: string) => {
    const {
        error,
        isPending: loading,
        data: url,
    } = useQuery({
        queryKey: ["ppts_download", "id"],
        queryFn: () => fetchPptDownloadUrl({id}),
    });

    return { url, loading, error };
};
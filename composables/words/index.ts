import { useQuery } from "@tanstack/vue-query";
import type { PageDto } from "~/lib/dto";
import type { wordListDto } from "~/lib/dto/word";
import type { Category } from "~/lib/schema/categories";
import type { Tag } from "~/lib/schema/tags";
import type { Word } from "~/lib/schema/word";

export const fetchWordTags = async () => {
    const response = await useAPI.get<Tag[]>("/resume/words/tags");
    return response;
};

export const useWordTags = () => {
    const {
        error,
        isPending: loading,
        data: tags,
    } = useQuery({
        queryKey: ["word_tags"],
        queryFn: () => fetchWordTags(),
    });

    return { tags, loading, error };
};

export const fetchWordCategories = async () => {
    const response = await useAPI.get<Category[]>("/resume/words/categories");
    return response;
};

export const useWordCategories = () => {
    const {
        error,
        isPending: loading,
        data: categories,
    } = useQuery({
        queryKey: ["word_categories"],
        queryFn: () => fetchWordCategories(),
    });

    return { categories, loading, error };
};

export const fetchWords = async (data: PageDto) => {
    const response = await useAPI.get<wordListDto>("/resume/words", data);
    return response.list;
};

export const useWords = (data: PageDto) => {
    const {
        error,
        isPending: loadingWords,
        data: words,
    } = useQuery({
        queryKey: ["words"],
        queryFn: () => fetchWords(data),
    });

    return { words, loadingWords, error };
};

export const fetchWordDetail = async (data: { id: string }) => {
    const response = await useAPI.get<Word>(`/resume/words/detail/${data.id}`);
    return response;
};

export const useWordDetail = (id: string) => {
    const {
        error,
        isPending: loading,
        data: word,
    } = useQuery({
        queryKey: ["words", "id"],
        queryFn: () => fetchWordDetail({id}),
    });

    return { word, loading, error };
};

export const fetchWordDownloadUrl = async (data: { id: string }) => {
    const response = await useAPI.get<Word>(`/resume/words/download/${data.id}`);
    return response;
};

export const useWordDownload = (id: string) => {
    const {
        error,
        isPending: loading,
        data: url,
    } = useQuery({
        queryKey: ["words_download", "id"],
        queryFn: () => fetchWordDownloadUrl({id}),
    });

    return { url, loading, error };
};
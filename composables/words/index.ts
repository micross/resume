import { useQuery } from "@tanstack/vue-query";
import type { PageDto } from "~/lib/dto";
import type { wordListDto } from "~/lib/dto/word";
import type { Category } from "~/lib/schema/categories";
import type { Tag } from "~/lib/schema/tags";

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
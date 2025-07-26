import { useQuery } from "@tanstack/vue-query";
import type { PageDto } from "~/lib/dto";
import type { TemplateListDto } from "~/lib/dto/template";
import type { Template } from "~/lib/schema/template";
import { useCreateTemplateStore } from "~/store/createTemplate";

export const fetchTemplates = async (data: PageDto) => {
    const response = await useAPI.get<TemplateListDto>("/resume/templates", data);
    return response;
};

export const useTemplates = (data: PageDto) => {
    const {
        error,
        isPending: loading,
        data: templates,
    } = useQuery({
        queryKey: ["templates"],
        queryFn: () => fetchTemplates(data),
    });

    return { templates, loading, error };
};


export const fetchTemplateDetail = async (data: { id: string }) => {
    const response = await useAPI.get<Template>(`/resume/templates/${data.id}`);
    return response;
};

export const useTemplateDetail = (id: string) => {
    const { HJNewJsonStore } = storeToRefs(useCreateTemplateStore());

    const {
        error,
        isPending: loading,
        data: template,
    } = useQuery({
        queryKey: ["templates", "id"],
        queryFn: () => fetchTemplateDetail({id}).then((res) => {
            HJNewJsonStore.value = res.template_json;
            return res;
        }),
    });

    return { template, loading, error };
};

export const fetchUserTemplateDetail = async (data: { id: string }) => {
    const response = await useAPI.get<Template>(`/resume/user-templates/${data.id}`);
    return response;
};

export const useUserTemplateDetail = (id: string) => {
    const { HJNewJsonStore } = storeToRefs(useCreateTemplateStore());

    const {
        error,
        isPending: loading,
        data: usertemplate,
    } = useQuery({
        queryKey: ["user-templates", "id"],
        queryFn: () => fetchUserTemplateDetail({id}).then((res) => {
            HJNewJsonStore.value = res.template_json;
            return res;
        }),
    });

    return { usertemplate, loading, error };
};
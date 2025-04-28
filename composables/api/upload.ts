// 多个文件一次上传
export const filesUploadAsync: any = async (data: any, path: string) => {
  const response = await useAPI.post(`/upload/filesUpload/${path}`, data);
  return response.data.value;
};

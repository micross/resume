

export const getCustomPdfAsync: any = async (params: any) => {
  const response = await useAPI.get(`http://localhost:3000/generate-pdf`, params);
  return response.data.value;
};

import { request } from "./axiosConfig";

const baseURL = process.env.REACT_APP_API_BASE_URL;
const token = process.env.REACT_APP_API_TOKEN;

const RelayApi = {
  create: async (formData: FormData, userId: number, subject: string, content: string, boardType: string) => {
    request.post(`/api/v1/boards/${userId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}}

export default RelayApi;
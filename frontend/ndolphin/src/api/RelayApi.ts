import { request } from "./axiosConfig";

const baseURL = process.env.REACT_APP_API_BASE_URL;
const token = process.env.REACT_APP_API_TOKEN;

const relayApi = {
  create: async (formData: FormData, boardType: string) => {
    request.post(`/api/v1/boards`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}}

export default relayApi;
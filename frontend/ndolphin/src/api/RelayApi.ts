import { request } from "./axiosConfig";

const baseURL = process.env.REACT_APP_API_BASE_URL;
const token = process.env.REACT_APP_API_TOKEN;

const relayApi = {
  create: async (formData: FormData) => {
    return request.post(`/api/v1/boards`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  list: () => {
    return request.get(`/api/v1/boards?type=RELAY_BOARD`)
  },

  update: async (formData: FormData, boardId: number) => {
    return request.put(`/api/v1/boards/${boardId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data'}
    })
  }

}

export default relayApi;
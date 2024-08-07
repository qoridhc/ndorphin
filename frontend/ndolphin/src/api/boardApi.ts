import { request } from "./axiosConfig";

const boardApi = {
  create: (formData: FormData) => {
    return request.post(`/api/v1/boards`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  list: (boardType: string, keyword?: string, filter1?: string, filter2?: string) => {
    return request.get(`/api/v1/boards?type=${boardType}&filter1=${filter1}&filter2=${filter2}&search=${keyword}`)
  },

  read: (boardId: string) => {
    return request.get(`/api/v1/boards/${boardId}`)
  },
  
  update: (formData: FormData, boardId: number) => {
    return request.put(`/api/v1/boards/${boardId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data'}
    })
  },

  delete: (boardId: string) => {
    return request.delete(`/api/v1/boards/${boardId}`)
  },
}

export default boardApi;
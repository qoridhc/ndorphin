import { request } from "./axiosConfig";

const boardApi = {
  create: (formData: FormData) => {
    return request.post(`/api/v1/boards`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  list: (boardType: string) => {
    return request.get(`/api/v1/boards?type=${boardType}`)
  },

  read: (boardId: string) => {
    return request.get(`/api/v1/boards/${boardId}`)
  },
  
  update: (formData: FormData, boardId: number) => {
    return request.put(`/api/v1/boards/${boardId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data'}
    })
  }
}

export default boardApi;
import { request } from "./axiosConfig";

const ifApi = {
  create: (formData: FormData) => {
    return request.post(`/api/v1/boards`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  read: (boardId: string) => {
    return request.get(`/api/v1/boards/${boardId}`)
  }  
}

export default ifApi;
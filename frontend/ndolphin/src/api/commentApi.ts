import { request } from "./axiosConfig";

const commentApi = {
  create: (boardId: string, formData: FormData) => {
    return request.post(`/api/v1/boards/${boardId}/comments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
}

export default commentApi;
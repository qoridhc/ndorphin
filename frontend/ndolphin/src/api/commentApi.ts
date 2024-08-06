import { request } from "./axiosConfig";

const commentApi = {
  create: (boardId: string, formData: FormData) => {
    return request.post(`/api/v1/boards/${boardId}/comments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  update: (boardId: string, commentId: number, data: { content: string }) => {
    return request.put(`/api/v1/boards/${boardId}/comments/${commentId}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  
  delete: (boardId: string, commentId: number) => {
    return request.delete(`/api/v1/boards/${boardId}/comments/${commentId}`);
  }
}

export default commentApi;
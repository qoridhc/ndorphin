import { request } from "./axiosConfig";
import npointApi from "./npoint";

const commentApi = {
  create: (boardId: string, formData: FormData) => {
    const data = {
      pointRuleId: 2,
    };
    npointApi.create(data);

    return request.post(`/api/v1/boards/${boardId}/comments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  update: (boardId: string, commentId: number, formData: FormData) => {
    return request.put(`/api/v1/boards/${boardId}/comments/${commentId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  
  delete: (boardId: string, commentId: number) => {
    return request.delete(`/api/v1/boards/${boardId}/comments/${commentId}`);
  },

  createLike: (boardId: string, commentId: number) => {
    const data = {
      pointRuleId: 4,
    };
    npointApi.create(data);

    return request.post(`/api/v1/boards/${boardId}/comments/${commentId}/like`);
  },

  deleteLike: (boardId: string, commentId: number) => {
    return request.delete(`/api/v1/boards/${boardId}/comments/${commentId}/like`);
  },
}

export default commentApi;
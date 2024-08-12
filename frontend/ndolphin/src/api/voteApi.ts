import { request } from "./axiosConfig";

const voteApi = {
  create: (boardId: string, data: { voteContentId: number }) => {
    return request.post(`/api/v1/boards/${boardId}/votes`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },

  delete: (boardId: string, voteId: number) => {
    return request.delete(`/api/v1/boards/${boardId}/votes/${voteId}`)
  },

  update: (boardId: string, voteId: number, data: { voteContentId: number }) => {
    return request.put(`/api/v1/boards/${boardId}/votes/${voteId}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export default voteApi;
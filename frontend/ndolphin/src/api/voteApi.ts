import { request } from "./axiosConfig";

const voteApi = {
  create: (boardId: string, data: {voteContentId: number}) => {
    return request.post(`/api/v1/boards/${boardId}/votes`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export default voteApi;
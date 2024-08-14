import { request } from "./axiosConfig";

const npointApi = {
  create: (data: { pointRuleId: number }) => {
    const userId = localStorage.getItem("userId");
    return request.post(`/api/v1/users/${userId}/npoint`, data)
  },
}

export default npointApi;
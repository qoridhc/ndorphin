import { instance } from "./axiosConfig";

const userApi = {
  login: (loginType: string) => {
    return instance.post(`/api/v1/auth/oauth2/${loginType}`);
  },
}

export default userApi;
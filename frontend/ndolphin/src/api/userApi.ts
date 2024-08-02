import { request } from "./axiosConfig";

const baseURL = process.env.REACT_APP_API_BASE_URL;
const token = process.env.REACT_APP_API_TOKEN;

const userApi = {
  login: (loginType: string) => {
    const oauthUrl = `${baseURL}/api/v1/auth/oauth2/${loginType}`;
    window.open(
      oauthUrl, 
      'googleLogin', 
      'width=500,height=600'
    );
  },

  update: (userId: string, newNickName: string) =>
    request.put(`${baseURL}/api/v1/users/${userId}`, { nickName: newNickName }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }),
}

export default userApi;
import { request } from "./axiosConfig";

const baseURL = process.env.REACT_APP_API_BASE_URL;
const token = process.env.REACT_APP_API_TOKEN;

const userApi = {
  login: (loginType: string) => {
    console.log('새창')
    const oauthUrl = `${baseURL}/api/v1/auth/oauth2/${loginType}`;
    const newWindow = window.open(
      oauthUrl, 
      'Login', 
      'width=500,height=600'
    );

    return newWindow;
  },

  update: (userId: string, newNickName: string) =>
    request.put(`${baseURL}/api/v1/users/${userId}`, { nickName: newNickName }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }),
}

export default userApi;
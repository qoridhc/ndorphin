import { request } from "./axiosConfig";

const baseURL = process.env.REACT_APP_API_BASE_URL;

interface NicknameCheckResponse {
  isDuplicate: boolean;
}

const userApi = {
  login: (loginType: string) => {
    const oauthUrl = `${baseURL}/api/v1/auth/oauth2/${loginType}`;
    const newWindow = window.open(
      oauthUrl, 
      'Login', 
      'width=500,height=600'
    );

    return newWindow;
  },

  checkNickname: (nickname: string) =>
    request.get<NicknameCheckResponse>(`/api/v1/users/check-nickname`, { params: { nickname } }),

  update: (userId: string, formData: FormData) =>
    request.put(`/api/v1/users/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
}

export default userApi;
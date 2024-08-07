import { request } from "./axiosConfig";

const baseURL = 'http://ec2-54-180-146-64.ap-northeast-2.compute.amazonaws.com:8080';

interface NicknameCheckResponse {
  isDuplicate: boolean;
}

interface ApiResponse<T> {
  code: string;
  data: T;
  message: string;
}

interface UserInfoResponse {
  createdAt: string;
  email: string;
  mbti: string;
  nickName: string;
  nickNameUpdatedAt: string;
  npoint: number;
  profileImage: string;
  role: string;
  type: string;
  updatedAt: string;
  userId: number;
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

  checkNickname: async (nickName: string) => { return request.get<NicknameCheckResponse>(`${baseURL}/api/v1/users/nickname-check`, { params: { nickName } }) },

  update: async (userId: string, formData: FormData) => {
    console.log(userId);
    console.log(formData);
    try {
      const response = request.put(`${baseURL}/api/v1/users/${userId}`, formData,);
      console.log("res status", (await response).status);
    } catch (error) {
      console.error('update request faile: ', error)
    }
  },

  getUserInfo: (userId: string) =>
    request.get<ApiResponse<UserInfoResponse>>(`${baseURL}/api/v1/users/${userId}`),

}

export default userApi;
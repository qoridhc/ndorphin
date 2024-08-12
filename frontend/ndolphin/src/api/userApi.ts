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
    const newWindow = window.open(oauthUrl, "Login", "width=500,height=600");

    return newWindow;
  },

  checkNickname: async (nickName: string) => {
    return request.get<NicknameCheckResponse>(`${baseURL}/api/v1/users/nickname-check`, { params: { nickName } });
  },

  update: (userId: string, formData: FormData) => {
    return request.put(`/api/v1/users/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteProfileImage: (userId: string) => {
    return request.delete(`/api/v1/users/image/${userId}`)
  },

  deleteUser: (userId: string) => {
    return request.delete(`/api/v1/users/${userId}`)
  },

  getUserInfo: (userId: string) => request.get<ApiResponse<UserInfoResponse>>(`/api/v1/users/${userId}`),

  follow: (userId: string, followUserId: string) => {
    return request.post(`/api/v1/follows/${userId}`, { followingId: followUserId }, { headers: { "Content-Type": "application/json" } });
  },

  unFollow: (userId: string, followUserId: string) => {
    return request.delete(`/api/v1/follows/${userId}`, {
      data: { followingId: followUserId },
      headers: { "Content-Type": "application/json" },
    });
  },

  getFollowing: (userId: string) => {
    return request.get(`/api/v1/follows/followings/${userId}`);
  },

  getFollower: (userId: string) => {
    return request.get(`/api/v1/follows/followers/${userId}`);
  },

  favorite: (boardId: number) => {
    return request.post(
      `api/v1/users/1/favorites`,
      {
        boardId: boardId,
      },
      { headers: { "Content-Type": "application/json" } }
    );
  },

  unfavorite: (boardId: number) => {
    return request.delete(
      `api/v1/users/favorites/${boardId}`
    );
  },

  getFavorites: (userId: string) => {
    return request.get(`api/v1/users/${userId}/favorites`)
  },

  addFavorites: (userId: string, boardId: string) => {
    return request.post(
      `api/v1/users/${userId}/favorites`,
      { userId: userId, boardId: boardId },
      { headers: { 'Content-Type': 'application/json' } }
    )
  },

  deleteFavorites: (userId: string, boardId: string) => {
    return request.delete(`api/v1/users/${userId}/favorites/${boardId}`)
  },

  getNpointPercent: (userId: string) => {
    return request.get(`/api/v1/users/${userId}/npoint-percent`)
  },

};

export default userApi;
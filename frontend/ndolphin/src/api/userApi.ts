import { instance } from "./axiosConfig";

const baseURL = 'http://ec2-54-180-146-64.ap-northeast-2.compute.amazonaws.com:8080'

const userApi = {
  // 로그인 요청 시 서버의 OAuth URL로 리디렉션
  login: (loginType: string) => {
    // window.location.href = `http://ec2-54-180-146-64.ap-northeast-2.compute.amazonaws.com:8080/api/v1/auth/oauth2/${loginType}`;
    const oauthUrl = `${baseURL}/api/v1/auth/oauth2/${loginType}`;
    window.open(
      oauthUrl, 
      'googleLogin', 
      'width=500,height=600'
    );
  },
}

export default userApi;
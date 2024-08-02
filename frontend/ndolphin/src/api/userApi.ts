import { instance } from "./axiosConfig";

const baseURL = 'http://ec2-54-180-146-64.ap-northeast-2.compute.amazonaws.com:8080'

const userApi = {
  login: (loginType: string) => {
    const oauthUrl = `${baseURL}/api/v1/auth/oauth2/${loginType}`;
    const newWindow = window.open(
      oauthUrl, 
      'googleLogin', 
      'width=500,height=600'
    );
    console.log('새창 열림')

    return newWindow;
  },
}

export default userApi;
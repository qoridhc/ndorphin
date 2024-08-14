import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const request = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type' : 'application/json'
  }
})

const getTokenExpirationTime = () => {
  const expirationTime = localStorage.getItem('tokenExpirationTime');
  return expirationTime ? parseInt(expirationTime, 10) : null;
};

const reToken = async (refreshToken: string) => {
  return request.post(
    `/api/v1/auth/token/reissue`,
    { refreshToken: refreshToken },
    { headers: { 'Content-Type': 'application/json' } }
  );
}

// 요청 인터셉터 설정
request.interceptors.request.use(
  async config => {
    // 요청 전에 추가 작업 수행 (예: 토큰 추가)
    try {
      // const token = process.env.REACT_APP_ACCESS_TOKEN;
      let token = await localStorage.getItem('accessToken');  // 비동기 함수로 변경
      const refreshToken = await localStorage.getItem('refreshToken');
      const tokenExpirationTime = getTokenExpirationTime();
      const currentTime = Date.now();

      if (tokenExpirationTime && (tokenExpirationTime - currentTime < 60000) && refreshToken) {
        try {
          const response = await reToken(refreshToken);
          token = response.data.accessToken;
          await localStorage.setItem('accessToken', token as string);
          setTokenExpirationTime(600);
        } catch (error) {
          console.error('토큰 재발급 에러: ', error);
          // 로그아웃 처리
          localStorage.removeItem('nickName');
          localStorage.removeItem('userId');
          localStorage.removeItem('profileImage');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('npoint');
          localStorage.removeItem('email');
          localStorage.removeItem('isNew');
          localStorage.removeItem('mbti');
          
          window.alert("세션이 만료되었습니다. 다시 로그인 해주세요.")
          window.location.href = "/";
        }
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Failed to retrieve the token from localStorage:", error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
request.interceptors.response.use(
  response => response,
  error => {
    // 오류 처리 (예: 401 Unauthorized 처리)
    if (error.response && error.response.status === 401) {
      // 로그아웃 처리 또는 리프레시 토큰 요청
    }
    return Promise.reject(error);
  }
);

export const setTokenExpirationTime = (expiresIn: number) => {
  const expirationTime = Date.now() + expiresIn * 1000;
  localStorage.setItem('tokenExpirationTime', expirationTime.toString());
};
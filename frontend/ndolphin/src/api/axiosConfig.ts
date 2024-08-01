import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://ec2-54-180-146-64.ap-northeast-2.compute.amazonaws.com:8080',
  timeout: 10000,
  headers: {
    'Content-Type' : 'application/json'
  }
})

// 요청 인터셉터 설정
instance.interceptors.request.use(
  config => {
    // 요청 전에 추가 작업 수행 (예: 토큰 추가)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
  response => response,
  error => {
    // 오류 처리 (예: 401 Unauthorized 처리)
    if (error.response && error.response.status === 401) {
      // 로그아웃 처리 또는 리프레시 토큰 요청
    }
    return Promise.reject(error);
  }
);
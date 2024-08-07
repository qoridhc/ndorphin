import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const request = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type' : 'application/json'
  }
})

// 요청 인터셉터 설정
request.interceptors.request.use(
  config => {
    // 요청 전에 추가 작업 수행 (예: 토큰 추가)
    // const token = localStorage.getItem('accessToken');
    const token = process.env.REACT_APP_ACCESS_TOKEN;
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
import axios from 'axios';
import useErrorStore from '../stores/useErrorStore';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
console.log('API BASE_URL:', BASE_URL);

// 인증 필요한 API (쿠키 전송 + 에러 모달)
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인증 불필요한 API (에러 모달 없음)
const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인증 API 에러 인터셉터
// 예시안 입니다. 추후 우리에 맞게 변경해서 쓰시면되여
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message || '요청 중 오류가 발생했습니다.';

    // 에러 모달 표시
    useErrorStore.getState().showError(message, status);

    return Promise.reject(error);
  },
);

export { api, publicApi };

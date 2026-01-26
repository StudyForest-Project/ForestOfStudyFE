import { api, publicApi } from './api';

/**
 * [사용법]
 * import { authService } from '../services';
 *
 * // 호출
 * const res = await authService.getMypage();
 * const res = await authService.createStudy({ name: '스터디명' });
 */

const authService = {
  // 예시안 입니다. 추후 삭제 후 작업 부탁드립니다.
  api,
  publicApi,
  // === 인증 필요한 API (쿠키 전송 + 에러 모달) ===
  // getMypage: () => api.get('/mypage'),
  // createStudy: (data) => api.post('/study/create', data),

  // === 인증 불필요한 API (에러 모달 없음) ===
  // getStudies: () => publicApi.get('/studies'),
  // getStudy: (id) => publicApi.get(`/study/${id}`),
};

export default authService;

import { verifyPassword } from '@/services';
import { useAuthStore } from '@/stores/authStore';

/* 쿠키 기반 스터디 인증 훅 */
export const useStudyAuth = (studyId) => {
  const { verifiedStudyId, verifyStudy } = useAuthStore();

  /* 현재 스터디에 대해 인증됐는지 */
  const isVerified = verifiedStudyId === studyId;

  /* 비밀번호 검증 */
  const verifyStudyPassword = async (password) => {
    await verifyPassword(studyId, password); // POST /verify-password
    verifyStudy(studyId); // zustand 상태 갱신
  };

  return {
    isVerified,
    verifyStudyPassword,
  };
};

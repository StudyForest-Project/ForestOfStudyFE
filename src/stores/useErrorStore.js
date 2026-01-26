import { create } from 'zustand';

// 이부분도 에러모달 예시안 입니다. 직접 작업하시는분이 수정하여 작업 부탁드리겠습니다.
//스토어는 각각 페이지 또는 기능에 맞게 파일생성해서 해주시면됩니다.
const useErrorStore = create((set) => ({
  isOpen: false,
  message: '',
  statusCode: null,

  // 에러 모달 열기
  showError: (message, statusCode = null) =>
    set({ isOpen: true, message, statusCode }),

  // 에러 모달 닫기
  closeError: () => set({ isOpen: false, message: '', statusCode: null }),
}));

export default useErrorStore;

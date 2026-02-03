import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      verifiedStudyId: null,

      verifyStudy: (studyId) => set({ verifiedStudyId: studyId }),
    }),
    {
      name: 'study-auth',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

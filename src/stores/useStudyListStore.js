import { getStudiesList } from '@/services/studyListService';
import { create } from 'zustand';

const useStudyListStore = create((set) => ({
  studyData: [],
  nextCursor: '',

  fetchStudies: async (pageSize = 6, search, sort = 'recent', cursor) => {
    try {
      const studyListData = await getStudiesList(
        pageSize,
        search,
        sort,
        cursor,
      );
      set((state) => ({
        studyData: Array.isArray(studyListData?.items)
          ? cursor
            ? [...state.studyData, ...studyListData.items]
            : studyListData.items
          : [],
        nextCursor: studyListData?.pageInfo.nextCursor,
      }));
    } catch {
      set({ studyData: [] });
    }
  },
}));

export default useStudyListStore;

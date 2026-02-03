import { api } from './api';

// GET studies/{studyId}/today-habits
const getTodayHabits = async (studyId) => {
  const res = await api.get(`/studies/${studyId}/today-Habits`);
  return res.data;
};

export { getTodayHabits };

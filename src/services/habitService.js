import { api } from './api';

// GET /studies/{studyId}/today-habits
const getTodayHabits = async (studyId) => {
  const res = await api.get(`/studies/${studyId}/today-habits`);
  return res.data;
};

// POST /studies/{studyId}/habits
const createHabit = async (studyId, title) => {
  const res = await api.post(`/studies/${studyId}/habits`, {
    title,
  });
  return res.data;
};

// PATCH /studies/{studyId}/habits/{habitId}
const updateHabit = async (studyId, habitId, title) => {
  const res = await api.patch(`/studies/${studyId}/habits/${habitId}`, {
    title,
  });
  return res.data;
};

// DELETE /studies/{studyId}/habits/{habitId}
const deleteHabit = async (studyId, habitId) => {
  const res = await api.delete(`/studies/${studyId}/habits/${habitId}`);
  return res.data;
};

// POST /studies/{studyId}/habits/{habitId}/toggle
const toggleHabitCheck = async (studyId, habitId, checked) => {
  const res = await api.post(`/studies/${studyId}/habits/${habitId}/toggle`, {
    checked,
  });
  return res.data;
};

export {
  getTodayHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  toggleHabitCheck,
};

import { api } from './api';

// GET /studies/:studyId/focus/timer
const getFocusInfo = async (studyId) => {
  const res = await api.get(`/studies/${studyId}/focus/timer`);
  return res.data;
};

// POST /studies/:studyId/focus-sessions
const createFocusSession = async (studyId, focusData) => {
  const res = await api.post(`/studies/${studyId}/focus-sessions`, focusData);
  return res.data;
};

// GET /studies/:studyId/focus/point-stats
const getPointStats = async (studyId) => {
  const res = await api.get(`/studies/${studyId}/focus/point-stats`);
  return res.data;
};

// GET /studies/:studyId/focus/focus-stats
const getFocusStats = async (studyId) => {
  const res = await api.get(`/studies/${studyId}/focus/focus-stats`);
  return res.data;
};

export { getFocusInfo, createFocusSession, getPointStats, getFocusStats };

import { api } from './api';

// GET /studies/:studyId
const getStudyDetail = async (studyId) => {
  const res = await api.get(`/studies/${studyId}`);
  return res.data;
};

// POST /studies/:studyId/emojis
const addEmojis = async (studyId, emojis) => {
  const res = await api.post(`/studies/${studyId}/emojis`, { emojis });
  return res.data;
};

// GET /studies/:studyId/emojis
const getEmojies = async (studyId) => {
  const res = await api.get(`/studies/${studyId}/emojis`);
  return res.data;
};

export { getStudyDetail, addEmojis, getEmojies };

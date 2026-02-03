import { api, publicApi } from './api';

// GET /studies/:studyId
const getStudyDetail = async (studyId) => {
  const res = await publicApi.get(`/studies/${studyId}`);
  return res.data;
};

// DELETE /studies/:studyId
const deleteStudy = async (studyId) => {
  const res = await api.delete(`/studies/${studyId}`);
  return res.data;
};

// GET /studies/:studyId/emojis
const getEmojis = async (studyId) => {
  const res = await publicApi.get(`/studies/${studyId}/emojis`);
  return res.data;
};

// POST /studies/:studyId/emojis
const addEmojis = async (studyId, emojis) => {
  const res = await publicApi.post(`/studies/${studyId}/emojis`, { emojis });
  return res.data;
};

export { getStudyDetail, deleteStudy, getEmojis, addEmojis };

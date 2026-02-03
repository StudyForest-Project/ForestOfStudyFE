import { api } from './api';

// POST /studies/:studyId/verified-password
const verifyPassword = async (studyId, password) => {
  const res = await api.post(`/studies/${studyId}/verify-password`, {
    password,
  });
  return res.data;
};

// GET /studiies/{studyId}/check-access
const checkAccess = async (studyId) => {
  const res = await api.get(`/studies/${studyId}/check-access`);
  return res.data.ok;
};

export { verifyPassword, checkAccess };

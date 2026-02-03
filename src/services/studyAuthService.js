import { api } from './api';

// POST /studies/:studyId/verified-password
const verifyStudyPassword = async (studyId, password) => {
  const res = await api.post(`/studies/${studyId}/verify-password`, {
    password,
  });
  return res.data;
};

export default verifyStudyPassword;

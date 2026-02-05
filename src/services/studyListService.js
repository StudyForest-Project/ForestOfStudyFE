import { publicApi } from './api';

//GET /studies
export const getStudiesList = async (
  pageSize = 6,
  search,
  sort = 'recent',
  cursor,
) => {
  const res = await publicApi.get(`/studies`, {
    params: {
      pageSize,
      sort,
      ...(search ? { search } : {}),
      ...(cursor ? { cursor } : {}),
    },
  });
  return res.data;
};

export const getRecentList = async (data) => {
  const res = await publicApi.post('/studies/recent', data);
  return res.data;
};

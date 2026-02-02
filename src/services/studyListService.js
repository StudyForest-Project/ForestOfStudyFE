import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const getStudiesList = async (pageSize = 999) => {
  const response = await axios.get(`${BASE_URL}/studies`, {
    params: { pageSize },
  });
  return response.data.items;
};

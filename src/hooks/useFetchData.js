import { useEffect, useState } from 'react';

export function useFetchData(fetchFunction, params = null) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const res =
          params !== null ? await fetchFunction(params) : await fetchFunction();

        if (res) {
          setData(res);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [fetchFunction, params]);

  return { data, setData, isLoading, error };
}

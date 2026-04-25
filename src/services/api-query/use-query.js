import { useEffect, useMemo, useState } from "react";

export const useQuery = (queries) => {
  const [data, setData] = useState(() => getInitialData(queries));
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const queryKeysValue = useMemo(() => getQueryKeysValue(queries), [queries]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const result = await getData(queries);
        setData(result);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [queryKeysValue]);

  return {
    data,
    isLoading,
    isError,
  };
};

const getQueryKeysValue = (queries) => {
  return JSON.stringify(Object.fromEntries(Object.entries(queries).map(([key, config]) => [key, config.queryKey])));
};

const getInitialData = (queries) => {
  return Object.fromEntries(Object.entries(queries).map(([key, value]) => [key, value.initialData ?? null]));
};

const getData = async (queries) => {
  const queryEntries = Object.entries(queries);

  const responses = await Promise.all(queryEntries.map(([, config]) => config.queryFn()));

  return Object.fromEntries(queryEntries.map(([key], index) => [key, responses[index].data]));
};

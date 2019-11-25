import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

export const fullUrl = (url: string) => `http://localhost:7632/api/${url}`;

export default function useFetch<T>(
  shortUrl: string,
  options?: RequestInit,
  initVal?: any
): [Error | undefined, T] {
  const url = fullUrl(shortUrl);
  const [data, setData] = useState<T>(initVal as T);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();

        setData(json);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return [error, data];
}

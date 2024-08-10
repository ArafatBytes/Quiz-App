import { useEffect, useState } from "react";

export default function useFetch(url, method, header) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState();

  useEffect(() => {
    async function fetchApi() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetch(url, {
          method: method || "GET",
          headers: header,
        });
        const response = await data.json();
        setResult(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    }
    fetchApi();
  }, []);

  return {
    loading,
    error,
    result,
  };
}

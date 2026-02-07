import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([]); // always an array
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true; // avoid state update after unmount

    const fetchHandler = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Make sure data is an array
        const productsArray = Array.isArray(result)
          ? result
          : result.products || []; // grab products if wrapped in object

        if (isMounted) setData(productsArray);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchHandler();

    return () => {
      isMounted = false; // cleanup
    };
  }, [url]);

  return { data, error, loading };
};

export default useFetch;

import { useEffect, useState } from "react";
import axios from "axios";


const useFetch = (url, params, options) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetch = () => {
      setLoading(true);
      axios
        .get(url, {
          params
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
  
    useEffect(() => {
      if (!options?.disabled) {
        fetch();
      }
    }, [url, options]);
  
    return { data, loading, error, refetch: fetch };
  }
  
  export default useFetch;
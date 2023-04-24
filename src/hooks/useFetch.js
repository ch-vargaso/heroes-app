import React, { useEffect, useState } from 'react'

function useFetch(url, check) {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const resultado = await response.json();
            if (resultado.error) {
                setError(error);
            }
            if (check === "sc") {
                setResult(resultado)
            }
            if (check === "mc") {
                setResult(resultado.results);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError(error);
            setLoading(false);
            
        }
    }

    useEffect(() => {
        fetchData();
    }, [url])

    return (
        {result, error, loading}
  )
}

export default useFetch
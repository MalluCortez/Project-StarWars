import { useState } from 'react';

function useFetch() {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErros] = useState(null);

  const makeFetch = async (url) => {
    setIsLoading(true);
    try {
      const promisse = await fetch(url);
      const response = await promisse.json();
      response.results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setPlanets(response.results);
    } catch (error) {
      setErros(error.message);
    }
  };

  return {
    makeFetch, planets, isLoading, errors,
  };
}

export default useFetch;

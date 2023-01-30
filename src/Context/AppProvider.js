import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const fetchPlanets = async (url) => {
    const promisse = await fetch(url);
    const response = await promisse.json();
    response.results.map((planet) => {
      delete planet.residents;
      return planet;
    });
    setPlanets(response.results);
  };

  const values = useMemo(() => ({
    planets, fetchPlanets,
  }), [planets]);

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;

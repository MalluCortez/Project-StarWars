import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import useFetch from '../Hooks/useFetch';

function AppProvider({ children }) {
  const { makeFetch, isLoading, erros, planets } = useFetch();

  const values = useMemo(() => ({
    planets, makeFetch, isLoading, erros,
  }), [planets, isLoading, erros, makeFetch]);

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

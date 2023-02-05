import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../Context/AppContext';

function Table() {
  const { planets, makeFetch } = useContext(AppContext);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterColumn, setFilterColumn] = useState('population');
  const [filterComparison, setFilterComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState(0);
  const [allInputs, setAllInputs] = useState([]);
  const [allColumn] = useState(['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water ',
  ]);

  useEffect(() => {
    makeFetch('https://swapi.dev/api/planets');
  }, []);

  const NumberFilter = () => {
    const NumberFilterObj = {
      column: filterColumn,
      comparison: filterComparison,
      value: filterValue,
    };
    setAllInputs([...allInputs, NumberFilterObj]);
  };

  const filtersSelects = (
    allPlanets,
    filterCom,
    filterCol,
    filterVal,
  ) => allPlanets.filter((planet) => {
    if (filterCom === 'menor que') {
      return Number(planet[filterCol]) < Number(filterVal);
    }
    if (filterCom === 'igual a') {
      return Number(planet[filterCol]) === Number(filterVal);
    }
    if (filterCom === 'maior que') {
      return Number(planet[filterCol]) > Number(filterVal);
    }
    return planet;
  });

  useEffect(() => {
    const allPlanets = allInputs.reduce((acc, curr) => filtersSelects(
      acc,
      curr.comparison,
      curr.column,
      curr.value,
    ), planets);
    setFilteredPlanets(allPlanets);
  }, [allInputs]);

  const handleClick = () => {
    NumberFilter();
  };

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredPlanets(planets);
    } else {
      setFilteredPlanets(planets.filter((e) => e.name.toLowerCase()
        .includes(searchTerm)));
    }
  }, [searchTerm, planets]);

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Filtrar por nome..."
        value={ searchTerm }
        onChange={ (event) => setSearchTerm(event.target.value) }
        id="name-filter"
      />
      <select
        data-testid="column-filter"
        onChange={ (event) => setFilterColumn(event.target.value) }
        value={ filterColumn }
        id="column-filter"
      >
        {allColumn.filter((col) => !allInputs.some((fil) => fil.column === col))
          .map((col) => <option key={ col } value={ col }>{col}</option>)}
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ (event) => setFilterComparison(event.target.value) }
        value={ filterComparison }
        id="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        value={ filterValue }
        onChange={ (event) => setFilterValue(event.target.value) }
        id="value-filter"
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleClick }
        id="button-filter"
      >
        Filtrar
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { filteredPlanets.filter((e) => e.name)
            .map((planet) => (
              <tr key={ planet.name }>
                <td>{ planet.name }</td>
                <td>{ planet.rotation_period}</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.population }</td>
                <td>{ planet.films }</td>
                <td>{ planet.created }</td>
                <td>{ planet.edited }</td>
                <td>{ planet.url }</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

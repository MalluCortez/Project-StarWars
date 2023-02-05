import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../Context/AppContext';

function Table() {
  const { planets, makeFetch } = useContext(AppContext);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterColumn, setFilterColumn] = useState('population');
  const [filterComparison, setFilterComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState(0);

  useEffect(() => {
    makeFetch('https://swapi.dev/api/planets');
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredPlanets(planets);
    } else {
      setFilteredPlanets(planets.filter((e) => e.name.toLowerCase()
        .includes(searchTerm)));
    }
  }, [searchTerm, planets]);

  const handleClick = () => {
    const allPlanets = planets.filter((planet) => {
      if (filterComparison === 'menor que') {
        return Number(planet[filterColumn]) < Number(filterValue);
      }
      if (filterComparison === 'igual a') {
        return Number(planet[filterColumn]) === Number(filterValue);
      }
      if (filterComparison === 'maior que') {
        return Number(planet[filterColumn]) > Number(filterValue);
      }
      return planet;
    });
    setFilteredPlanets(allPlanets);
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Filtrar por nome..."
        value={ searchTerm }
        onChange={ (event) => setSearchTerm(event.target.value) }
      />
      <select
        data-testid="column-filter"
        onChange={ (event) => setFilterColumn(event.target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ (event) => setFilterComparison(event.target.value) }
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
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleClick }
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

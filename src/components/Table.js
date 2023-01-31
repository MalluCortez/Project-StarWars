import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../Context/AppContext';

function Table() {
  const { planets, makeFetch } = useContext(AppContext);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  console.log(planets);

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Filtrar por nome..."
        value={ searchTerm }
        onChange={ (event) => setSearchTerm(event.target.value) }
      />
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

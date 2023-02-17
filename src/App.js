import { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

const CHARACTER_FIELDS = [
  { label: 'Name', value: 'name' },
  { label: 'Birth Year', value: 'birth_year' },
  { label: 'Gender', value: 'gender' },
  { label: 'Height', value: 'height' },
];

const PLANET_FIELDS = [
  { label: 'Name', value: 'name' },
  { label: 'Climate', value: 'climate' },
  { label: 'Terrain', value: 'terrain' },
  { label: 'Population', value: 'population' },
];

const STARSHIP_FIELDS = [
  { label: 'Name', value: 'name' },
  { label: 'Model', value: 'model' },
  { label: 'Manufacturer', value: 'manufacturer' },
  { label: 'Cost in Credits', value: 'cost_in_credits' },
  { label: 'Max Atmosphering Speed', value: 'max_atmosphering_speed' },
];

const StarWarsData = () => {
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [starships, setStarships] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState('asc');
  const [activeTab, setActiveTab] = useState('characters');

  useEffect(() => {
	 async function fetchData() {
		let allCharacters = [];
		let nextPageUrl = "https://swapi.dev/api/people/";

		while (nextPageUrl !== null) {
		  const response = await fetch(nextPageUrl);
		  const data = await response.json();
		  allCharacters = allCharacters.concat(data.results);
		  nextPageUrl = data.next;
		}

		setCharacters(allCharacters);
	 }

	 fetchData();
  }, []);

  useEffect(() => {
	 async function fetchData() {
		let allPlanets = [];
		let nextPageUrl = "https://swapi.dev/api/planets/";

		while (nextPageUrl !== null) {
		  const response = await fetch(nextPageUrl);
		  const data = await response.json();
		  allPlanets = allPlanets.concat(data.results);
		  nextPageUrl = data.next;
		}

		setPlanets(allPlanets);
	 }

	 fetchData();
  }, []);

  useEffect(() => {
	 async function fetchData() {
		let allStarships = [];
		let nextPageUrl = "https://swapi.dev/api/starships/";

		while (nextPageUrl !== null) {
		  const response = await fetch(nextPageUrl);
		  const data = await response.json();
		  allStarships = allStarships.concat(data.results);
		  nextPageUrl = data.next;
		}

		setStarships(allStarships);
	 }

	 fetchData();
  }, []);

  const handleSearch = event => {
	 setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortField(event.target.value);
  };

  const sortedStarships = [...starships].sort((a, b) => {
    if (a[sortField] < b[sortField]) {
      return -1;
    }
    if (a[sortField] > b[sortField]) {
      return 1;
    }
    return 0;
  });

  const filteredCharacters = characters.filter((item) => {
	 return (
		item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		item.birth_year.toLowerCase().includes(searchTerm.toLowerCase()) ||
		item.homeworld.toLowerCase().includes(searchTerm.toLowerCase())
	 );
  });

  const filteredPlanets = planets.filter((item) => {
	 return (
		item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		item.climate.toLowerCase().includes(searchTerm.toLowerCase()) ||
		item.terrain.toLowerCase().includes(searchTerm.toLowerCase())
	 );
  });

  const filteredStarships = starships.filter((item) => {
	 return (
		item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
		item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
	 );
  });

  return (
	 <div className="App">
		<div className="sideBar">
		  <h1>Star Wars for Bold Science</h1>
		  <label className="label">Search: </label>
		  <input
			 type="text"
			 placeholder="May The Force Be With You"
			 value={searchTerm}
			 onChange={(e) => setSearchTerm(e.target.value)}
		  />
		  <div class='filter'>
			 <label className="label">Sort By: </label>
			 <select value={sortField} onChange={handleSort}>
				{CHARACTER_FIELDS.map(field => (
				  <option key={field.value} value={field.value}>
					 {field.label}
				  </option>
				))}
				{PLANET_FIELDS.map(field => (
				  <option key={field.value} value={field.value}>
					 {field.label}
				  </option>
				))}
				{STARSHIP_FIELDS.map(field => (
				  <option key={field.value} value={field.value}>
					 {field.label}
				  </option>
				))}
			 </select>
		  </div>
		</div>
		  <div class='table-container'>
				<h3>Planets</h3>
			 <table>
				<thead className="tabel-header">
				  <tr className="tabel-row">
					 <td className="tabel-cell">Name</td>
					 <td className="tabel-cell">Climate</td>
					 <td className="tabel-cell">Terrain</td>
					 <td className="tabel-cell">Population</td>
				  </tr>
				</thead>
				<tbody className="tabel-body">
				  {filteredPlanets.map(planet => (
					 <tr key={planet.name}>
						<td className="tabel-cell">{planet.name}</td>
						<td className="tabel-cell">{planet.climate}</td>
						<td className="tabel-cell">{planet.terrain}</td>
						<td className="tabel-cell">{planet.population}</td>
					 </tr>
				  ))}
				</tbody>
				<br/>
				<h3>Characters</h3>
				<thead className="tabel-header">
				  <tr className="tabel-row">
					 <td className="tabel-cell">Name</td>
					 <td className="tabel-cell">Birth Year</td>
					 <td className="tabel-cell">Gender</td>
					 <td className="tabel-cell">Height</td>
					 <td className="tabel-cell">Mass</td>
				  </tr>
				</thead>
				<tbody className="tabel-body">
				{filteredCharacters.map(character => (
				  <tr key={character.name}>
					 <td className="tabel-cell">{character.name}</td>
					 <td className="tabel-cell">{character.birth_year}</td>
					 <td className="tabel-cell">{character.gender}</td>
					 <td className="tabel-cell">{character.height}</td>
					 <td className="tabel-cell">{character.mass}</td>
				  </tr>
				))}
			 </tbody>
				<br/>
				<h3>Starships</h3>
				<thead className="tabel-header">
				  <tr className="tabel-row">
					 <td className="tabel-cell">Name</td>
					 <td className="tabel-cell">Model</td>
					 <td className="tabel-cell">Manufacturer</td>
					 <td className="tabel-cell">Cost In Credits</td>
					 <td className="tabel-cell">Speed</td>
				  </tr>
				</thead>
				<tbody className="tabel-body">
				{filteredStarships.map(starships => (
				  <tr key={starships.name}>
					 <td className="tabel-cell">{starships.name}</td>
					 <td className="tabel-cell">{starships.model}</td>
					 <td className="tabel-cell">{starships.manufacturer}</td>
					 <td className="tabel-cell">{starships.cost_in_credits}</td>
					 <td className="tabel-cell">{starships.max_atmosphering_speed}</td>
				  </tr>
				))}
			 </tbody>
			 </table>
		  </div>
	 </div>
  );
};

export default StarWarsData;

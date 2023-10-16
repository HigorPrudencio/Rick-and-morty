import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [statusFilter, setStatusFilter] = useState(''); // Estado para armazenar o filtro de status

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character?page=1')
      .then((response) => {
        setCharacters(response.data.results);
      })
      .catch((error) => {
        console.error('Erro ao buscar personagens:', error);
      });
  }, []);

  const loadMoreCharacters = () => {
    const nextPage = characters.length > 0 ? characters[characters.length - 1].id + 1 : 1;
    axios.get(`https://rickandmortyapi.com/api/character?page=${nextPage}`)
      .then((response) => {
        setCharacters([...characters, ...response.data.results]);
      })
      .catch((error) => {
        console.error('Erro ao buscar mais personagens:', error);
      });
  };

  const handleSort = () => {
    const sortedCharacters = [...characters];
    if (sortOrder === 'asc') {
      sortedCharacters.sort((a, b) => a.name.localeCompare(b.name));
      setSortOrder('desc');
    } else {
      sortedCharacters.sort((a, b) => b.name.localeCompare(a.name));
      setSortOrder('asc');
    }
    setCharacters(sortedCharacters);
  };

  return (
    <div className="app-container">
      <h1>Lista de Personagens de Rick and Morty</h1>

      {/* Controle de filtro */}
      <div>
        <label>Filtrar por Status:</label>
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Todos</option>
          <option value="alive">Vivo</option>
          <option value="unknown">Desconhecido</option>
          <option value="dead">Morto</option>
        </select>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Pesquisar personagens"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <button onClick={handleSort}>
        Ordenar {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
      </button>

      <ul>
        {characters
          .filter((character) => {
            if (statusFilter) {
              return character.status.toLowerCase() === statusFilter;
            }
            return true;
          })
          .filter((character) => character.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((character) => (
            <li key={character.id} className="character-item">
              <Link to={`/character/${character.id}`}>
                <img src={character.image} alt={character.name} />
                {character.name}
              </Link>
            </li>
          ))}
      </ul>

      <button onClick={loadMoreCharacters}>Carregar Mais Personagens</button>
    </div>
  );
}

export default App;

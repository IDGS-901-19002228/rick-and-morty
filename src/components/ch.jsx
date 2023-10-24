import React from 'react';
import { useEffect, useState, useCallback } from 'react';

const Characters = ({ characters, setCharacters }) => {

    const resetCharacters = () => {
        setCharacters(null);
    };

    const [searchInput, setSearchInput] = useState('');
    // Función para buscar y actualizar personajes
    const getSearchCharacters = useCallback(async () => {
        const apiUrl = `https://rickandmortyapi.com/api/character/?name=${searchInput}`;
        const api = await fetch(apiUrl);
        const charactersApi = await api.json();
        setCharacters(charactersApi.results);
    }, [searchInput]);

    // Manejar cambios en el campo de búsqueda
    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    // Utilizar useEffect para buscar personajes cuando cambia el valor de búsqueda
    useEffect(() => {
        getSearchCharacters();
    }, [searchInput, getSearchCharacters]);



  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchInput}
          onChange={handleSearchChange}
        />
        <button onClick={getSearchCharacters} className="btn btn-dark">
          Buscar
        </button>
      </div>
      <h1>Characters</h1>
      <button className='btn btn-secondary back-home' onClick={resetCharacters}>Volver al Inicio</button>
      <div className='container-characters'>
        {characters && characters.map((character, index) => (
          <div className='character-container' key={index}>
            <div>
              <img src={character.image} alt={character.name} />
            </div>
            <div>
              <h3 className='text-grey'>{character.name}</h3>
              <h6 className='text-grey'>
                {character.status === 'Alive' ? (
                  <>
                    <span className='alive'></span>
                    Alive
                  </>
                ) : (
                  <>
                    <span className='dead'></span>
                    Dead
                  </>
                )
                }
              </h6>
              <p>
                <span className='text-grey'>Episodios: </span>
                <span className='text-grey'>{character.episode.length}</span>
              </p>
              <p>
                <span className='text-grey'>Especie: </span>
                <span className='text-grey'>{character.species}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className='btn btn-secondary back-home' onClick={resetCharacters}>Volver al Inicio</button>
    </div>
  );
};

export default Characters;

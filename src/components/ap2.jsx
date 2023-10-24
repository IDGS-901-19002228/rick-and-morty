import React, { useState, useEffect } from 'react';
import Characters from './components/Characters';
import imagenRickMorty from './img/rick-morty.png';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import '/node_modules/bootstrap/dist/js/bootstrap.min.js';

function App() {
    const [characters, setCharacters] = useState(null);
    const [page, setPage] = useState(1);
  
    useEffect(() => {
      const cargarCharacters = async () => {
        const apiUrl = `https://rickandmortyapi.com/api/character/?page=${page}`;
        const api = await fetch(apiUrl);
        const charactersApi = await api.json();
        setCharacters(charactersApi.results);
      };
  
      cargarCharacters();
    }, [page]);
  
    const cargarCharactersAnterior = () => {
      if (page > 1) {
        setPage(page - 1);
      }
    };
  
    const cargarCharactersSiguiente = () => {
      setPage(page + 1);
    };
  
    const regApi = async () => {
      const api = await fetch('https://rickandmortyapi.com/api/character');
      const charactersApi = await api.json();
      setCharacters(charactersApi.results);
    };
  
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="title">Rick & Morty</h1>
          <img src={imagenRickMorty} alt="Rick & Morty" className="img-home" />
          <br />
          <button onClick={regApi} className="btn btn-success btn-search">
            Buscar Personajes
          </button>
          {characters && (
            <>
              <Characters characters={characters} setCharacters={setCharacters} />
              <div className="buttons">
                <br />
                <button onClick={cargarCharactersAnterior} type="button" className="btn btn-primary btn-load-more">
                  Anterior
                </button>
                <button onClick={cargarCharactersSiguiente} type="button" className="btn btn-primary btn-load-more">
                  Siguiente
                </button>
              </div>
            </>
          )}
        </header>
      </div>
    );
  }

export default App;

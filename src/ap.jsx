import imagenRickMorty from './img/rick-morty.png';
import './App.css';
import { useEffect, useState, useCallback } from 'react';
import Characters from './components/Characters';
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";

function App() {
    //Definimos un state para almacenar los datos de los personajes.
    const [characters, setCharacters] = useState(null);
    const [page, setPage] = useState(1);



    const getCharacters = useCallback(async () => {
        const apiUrl = characters
        ? `https://rickandmortyapi.com/api/character/?page=${page}`
        : 'https://rickandmortyapi.com/api/character';

        const api = await fetch(apiUrl);
        const charactersApi = await api.json();
        setCharacters(charactersApi.results);
    }, [characters, page]);

    const cargarCharacters = () => {
        setPage(page + 1);
    };

    const cargarCharactersAnterior = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const regApi = async () => {
        const api = await fetch('https://rickandmortyapi.com/api/character');
        const charactersApi = await api.json();
        setCharacters(charactersApi.results);
    };

    useEffect(() => {
        getCharacters();
    }, [getCharacters]);

    useEffect(() => {
        (async function () {
          let data = await fetch(api).then((res) => res.json());
          console.log(data);
        })();
      }, [api]);

    return (
        <div className='App'>
        <header className='App-header'>
        <h1 className='title'>Rick & Morty</h1>
        {characters ? (
          <>
            <Characters characters={characters} setCharacters={setCharacters} />
            <div className="buttons">
              <br />
              <button onClick={cargarCharactersAnterior} type='button' className="btn btn-primary btn-load-more">
                Anterior
              </button>
              <button onClick={cargarCharacters} type='button' className="btn btn-primary btn-load-more">
                Siguiente
              </button>
            </div>
          </>
        ) : (
          <>
            <img src={imagenRickMorty} alt='Rick & Morty' className='img-home' /><br />
            <button onClick={regApi} className='btn btn-success btn-search'>Buscar Personajes</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;

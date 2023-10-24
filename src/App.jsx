import imagenRickMorty from './img/rick-morty.png'
import './App.css'
import { useState } from 'react';
import Characters from './components/Characters';
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";


function App() {
  //Definimos un state para almacenar los datos de los personajes.
  const [characters, setCharacters] = useState(null);
  const [page, setPage] = useState(1);
  // const [searchInput, setSearchInput] = useState('');

  // const buscarNombre = async () => {
  //   const apiUrl = `https://rickandmortyapi.com/api/character/?name=${searchInput}`;
  //   const api = await fetch(apiUrl);
  //   const charactersApi = await api.json();
  //   setCharacters(charactersApi.results);
  // };

  const cargarCharacters = async () => {
    setPage(page + 1);
    const apiUrl = `https://rickandmortyapi.com/api/character/?page=${page + 1}`;
    const api = await fetch(apiUrl);
    const charactersApi = await api.json();
    setCharacters(charactersApi.results);
  };

  const cargarCharactersAnterior = async () => {
    if (page > 1) {
      setPage(page - 1);
      const apiUrl = `https://rickandmortyapi.com/api/character/?page=${page - 1}`;
      const api = await fetch(apiUrl);
      const charactersApi = await api.json();
      setCharacters(charactersApi.results);
    }
  };

  const regApi = async () => {

    //Realizamos la peticion
    const api = await fetch('https://rickandmortyapi.com/api/character');

    //Recuperamos los personajes
    const charactersApi = await api.json();
    console.log(charactersApi);

    //Le asignamos la cadena con los datos al state
    setCharacters(charactersApi.results);

  }

  // Manejar cambios en el campo de búsqueda
  // const handleSearchChange = (e) => {
  //   setSearchInput(e.target.value);
  // };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='title'>Rick & Morty</h1>
        {/* <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchInput}
            onChange={handleSearchChange}
          />
          <button onClick={buscarNombre} className="btn btn-dark">
            Buscar
          </button>
        </div> */}
        {
          characters ? (
            <>
              <Characters characters={characters} setCharacters={setCharacters}/>
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
              <img src={imagenRickMorty} alt='Rick & Morty' className='img-home'/><br />
              <button onClick={regApi} className='btn btn-success btn-search'>Buscar Personajes</button>
            </>
          )
        }
      </header>
    </div>
  )
}

export default App

import React from 'react'
import { useState } from 'react';

const Characters = ({characters, setCharacters}) => {

    //Metodo para resetear el state characters
    const resetCharacters = () => {
        setCharacters(null);
    }

    const [searchInput, setSearchInput] = useState('');
    const searchApi = async () => {
        const apiUrl = `https://rickandmortyapi.com/api/character/?name=${searchInput}`;
        const api = await fetch(apiUrl);
        const charactersApi = await api.json();
        setCharacters(charactersApi.results);
    };

    //Manejar cambios en el campo de búsqueda
    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

  return (
    <div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchInput}
            onChange={handleSearchChange}
          />
          <button onClick={searchApi} className="btn btn-dark">
            Buscar
          </button>
        </div>
        <h1>Characters</h1>
        <button className='btn btn-secondary back-home' onClick={resetCharacters}>Volver al Inicio</button>
        <div className='container-characters'>
            {/*Recorrer los datos con la funcion map*/
                characters.map((character,index) => (
                    <div className='character-container' key={index}>
                        <div>
                            <img src={character.image} alt={character.className}/>
                        </div>
                        <div>
                            <h3 className='text-grey'>{character.name}</h3>
                            <h6 className='text-grey'>
                                {character.status === 'Alive' ? (
                                    <>
                                        <span className='alive'></span>
                                        Alive
                                    </>
                                ): (
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
                ))
            }
        </div>
        <button className='btn btn-secondary back-home' onClick={resetCharacters}>Volver al Inicio</button>
    </div>
  )
}



export default Characters;
import React, {useState, useEffect}  from 'react';
import { Autocomplete } from '@mantine/core';
import axios from 'axios';

function TextInput() {
    
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
     axios.get("https://pokeapi.co/api/v2/pokemon/")
       .then(res => {
           setPokemons(res.data.results.map(pokemon=>pokemon.name));
       })
    }, [])
  return (
    <div className="TextWrapper">
            <Autocomplete
      label="Gotta search 'em all!"
      placeholder="Insert pokémon name"
      data={ pokemons }
    />
    </div>
  );
}

export default TextInput;

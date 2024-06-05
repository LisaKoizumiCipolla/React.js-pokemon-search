import React, { useState } from 'react';
import { Autocomplete } from '@mantine/core';
import { Button } from '@mantine/core';

function TextInput({list, search}) {
  const [searchValue, setSearchValue] = useState('');

  const onButtonPress = () => {
    search(searchValue);
  };

  return (
    <div className="text-wrapper">
      <h1>Gotta search 'em all!</h1>
      <div className='button-wrapper'>
        <Autocomplete
          //label="Gotta search 'em all!"
          placeholder="Insert pokémon name"
          data={ list.map((pokemon) => pokemon.name) }
          className='searchbar'
          onChange={setSearchValue}
          />
        <Button variant="filled" color="rgba(31, 176, 255, 1)" onClick={onButtonPress}>Search</Button>
      </div>

    </div>
  );
}

export default TextInput;

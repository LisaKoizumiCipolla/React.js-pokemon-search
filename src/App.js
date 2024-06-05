import React , {useState, useEffect} from 'react';
import { LoadingOverlay, Container, Box } from '@mantine/core';
import './App.css';
import TextInput from './Components/TextInput'; 
import HeaderNavbar from './Components/HeaderNavbar';
import ResultPokemon from './Components/ResultPokemon';
import axios from 'axios';

function App() {
  
  const [pokemons, setPokemons] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getPokemons(url) {
    const res = await axios.get(url);
    let pokemons = res.data.results;

    if(res.data.next) {
      const nextPagePokemons = await getPokemons(res.data.next);
      pokemons = pokemons.concat(nextPagePokemons);
    }else{
      setLoading(false);
    }

    return pokemons;

  }

  useEffect(() => {
    getPokemons("https://pokeapi.co/api/v2/pokemon/")
      .then((res) => {
        setPokemons(res);
      });
   }, []);
   
  return (
    <Container className="App" fluid>
      
      <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        <div className='content'>
          
          <HeaderNavbar/>
          <Box className='transition' pt={selected?0:200}>
            <TextInput list={pokemons} search={setSelected} />
          </Box>
          {selected !== null && <ResultPokemon pokemonName={selected} setSelected={setSelected} />}
        </div>
    </Container>
  );
}

export default App;


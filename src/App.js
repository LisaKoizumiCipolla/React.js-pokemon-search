import React , {useState, useEffect} from 'react';
import './App.css';
import TextInput from './Components/TextInput'; 
import HeaderNavbar from './Components/HeaderNavbar';
import ResultPokemon from './Components/ResultPokemon';
import axios from 'axios';

function App() {
  
  const [pokemons, setPokemons] = useState([]);
  const [selected, setSelected] = useState(null);

  async function getPokemons(url) {
    const res = await axios.get(url);
    let pokemons = res.data.results;

    if(res.data.next) {
      const nextPagePokemons = await getPokemons(res.data.next);
      pokemons = pokemons.concat(nextPagePokemons);
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
    <div className="App">
      <div className='Content'>
        <HeaderNavbar/>
        <TextInput list={pokemons} search={setSelected} />
        {selected !== null && <ResultPokemon pokemonName={selected} />}
      </div>
    </div>
  );
}

export default App;


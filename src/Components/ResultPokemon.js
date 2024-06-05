import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Grid, Container, Image } from '@mantine/core';

function ResultPokemon ({pokemonName, setSelected}) {
    const [pokemon, setPokemon] = useState(null);
    const [evolutions, setEvolutions] = useState([]);
    
    

    function simplifyEvolutionData(chain) {
        let evolutions = [chain.species];
        if(chain.evolves_to.length) {
            for(const evolution of chain.evolves_to) {
                evolutions = evolutions.concat(simplifyEvolutionData(evolution));
            }
        }
        return evolutions;
    }

    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
            .then((pokemonRes) => {
                setPokemon(pokemonRes.data);

                axios.get(pokemonRes.data.species.url)
                    .then((speciesRes) => {

                        axios.get(speciesRes.data.evolution_chain.url)
                            .then((evolutionRes) => {
                                const evolutions = simplifyEvolutionData(evolutionRes.data.chain);
                                setEvolutions(evolutions);
                                console.log(pokemon)
                            });

                    });
            });
    }, [pokemonName]);

    if (!pokemon || !evolutions.length) {
        // TODO: loading screen?
        return null;
    }

    return (
        <Container>
             <Grid>
                <Grid.Col span={3}>
                    <Image w={200} h="auto" src={pokemon.sprites.front_default} alt='Pokemon Image'/>
                    
                </Grid.Col>
                <Grid.Col span={3}>                   
                    <h4>Name:</h4>
                    <p>{pokemon.name}</p>
                </Grid.Col>

                <Grid.Col span={3}>
                    <h4>ID:</h4>
                    <p>{pokemon.id}</p> 
                </Grid.Col>

                <Grid.Col span={3}>
                    <h4>Type:</h4>
                    <p>{pokemon.types.map((type) => type.type.name).join(' - ')}</p> 
                </Grid.Col>


                    <Grid.Col span={4}>              
                        <h4>Height:</h4>
                        <p>{pokemon.height}"</p>
                    </Grid.Col>

                    <Grid.Col span={4}>
                        <h4>Weight:</h4>
                        <p>{pokemon.weight} lb</p>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <h4>Evolution:</h4>
                        <p>
                            <ul>
                                {evolutions.map((evolution) => <li 
                                key={evolution.name} 
                                className={pokemon.name === evolution.name? "selected-pokemon" : "cursor"} 
                                onClick={()=>pokemon.name !== evolution.name? setSelected(evolution.name) : null}>{evolution.name}</li>)}
                            </ul>
                        </p>
                    </Grid.Col>
            </Grid>
        </Container>

    );
}
 
export default ResultPokemon;
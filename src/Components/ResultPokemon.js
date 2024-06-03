import React, {useState, useEffect} from 'react';
import axios from 'axios';

function ResultPokemon ({pokemonName}) {
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
                            });

                    });
            });
    }, [pokemonName]);

    if (!pokemon || !evolutions.length) {
        // TODO: loading screen?
        return null;
    }

    return (
        <dl>
            <dt>Name:</dt>
            <dd>{pokemon.name}</dd>

            <dt>Height:</dt>
            <dd>{pokemon.height}</dd>

            <dt>Weight:</dt>
            <dd>{pokemon.weight}</dd>

            <dt>Evolution:</dt>
            <dd>
                <ul>{evolutions.map((evolution) => <li key={evolution.name} className={pokemon.name === evolution.name? "selectedPokemon" : null}>{evolution.name}</li>)}</ul>
            </dd>
        </dl>
    );
}
 
export default ResultPokemon;
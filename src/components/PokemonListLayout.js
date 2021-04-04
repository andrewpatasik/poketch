import React from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import PokemonCard from './PokemonCard';

function PokemonListLayout({pokemonData, myPokemonCounter, handleGenerateRandomPokemon}) {
    function generateRandomPokemon() {
        let randomIndex = Math.floor(Math.random() * 1115);
        handleGenerateRandomPokemon(randomIndex)
    }
    
    return (
        <section>
            <Switch>
                <Route exact path="/poketch/">
                    <div className="pokemon-list">
                        <div className="grid grid-3-col">
                            {
                            pokemonData.map((pokemon, index) => {
                                return <Link className="card-link" to={`/pokedex/${pokemon.id}`} key={index}>
                                            <PokemonCard name={pokemon.name} id={pokemon.id} myPokemonCounter={myPokemonCounter} />
                                        </Link>
                            })
                            }
                        </div>                    
                        <p>choose a pokemon to catch</p>
                        <button onClick={generateRandomPokemon} className="btn shuffle-btn">Shuffle</button>
                    </div>
                </Route>
                <Route path="/mypokemon">
                    <div className="my-pokemon-list grid grid-3-col scrollable">
                        {
                        pokemonData.length !== 0 ? pokemonData.map((pokemon, index) => {
                            return <Link className="card-link" to={`/mypokemon/${index}`} key={index}>
                                        <PokemonCard name={pokemon.nickname} myPokemonCounter={myPokemonCounter}/>
                                    </Link>
                        }) :
                        <h1 className="empty-list centered">Hey it's empty, go catch some pokemon!</h1>
                        }
                    </div>              
                </Route>
            </Switch>
        </section>
    )
}

export default PokemonListLayout;
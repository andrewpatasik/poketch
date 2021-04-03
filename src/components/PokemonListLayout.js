import React from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import PokemonCard from './PokemonCard';

function PokemonListLayout(props) {
    // console.log(props.pokemonData)
    
    return (
        <section>
            <Switch>
                <Route exact path="/">
                    <div className="pokemon-list">
                        <div className="grid grid-3-col">
                            {
                            props.pokemonData.map((pokemon, index) => {
                                return <Link className="card-link" to={`/pokedex/${pokemon.id}`} key={index}><PokemonCard name={pokemon.name} id={pokemon.id} myPokemonCounter={props.myPokemonCounter} /></Link>
                            })
                            }
                        </div>                    
                        <p>choose a pokemon to catch</p>
                        <button className="btn shuffle-btn">Shuffle</button>
                    </div>
                </Route>
                <Route path="/mypokemon">
                    <div className="my-pokemon-list grid grid-3-col scrollable">
                        {
                        props.pokemonData.map((pokemon, index) => {
                            return <Link className="card-link" to={`/mypokemon/${index}`} key={index}><PokemonCard name={pokemon.nickname} myPokemonCounter={props.myPokemonCounter}/></Link>
                        })
                        }
                    </div>              
                </Route>
            </Switch>
        </section>
    )
}

export default PokemonListLayout;
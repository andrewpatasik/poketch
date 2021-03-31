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
                    <h1>choose a pokemon to catch</h1>
                    <div className="grid grid-3-col">
                        {
                        props.pokemonData.map((pokemon, index) => {
                            return <Link to={`/pokedex/${pokemon.id}`} key={index}><PokemonCard detail={pokemon.name} /></Link>
                        })
                        }
                    </div>                    
                </Route>
                <Route path="/mypokemon">
                    <h1>My Pokemon</h1>  
                    <div className="grid grid-3-col">
                        {
                        props.pokemonData.map((pokemon, index) => {
                            return <Link to={`/mypokemon/${index}`} key={index}><PokemonCard detail={pokemon.name} /></Link>
                        })
                        }
                    </div>              
                </Route>
            </Switch>
        </section>
    )
}

export default PokemonListLayout;
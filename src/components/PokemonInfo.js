import React from 'react';
import { useParams, Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';

function PokemonInfo(props) {
    const { index } = useParams();
    
    function add() {
        props.handleAdd(index);
    }

    function remove() {
        props.handleRemove(index);
    }

    return (
        <section>
        <Switch>
            <Route exact path="/pokedex/:index">
                <div>
                    {
                        props.pokemonData.map(pokemon => {
                            let id = pokemon.id.toString();
                            if (index === id) {
                                return <h1 key={id}>{pokemon.name}</h1>
                            }
                        })
                    } 
                    {props.handleAdd === undefined ? null : <Link to="/"><button onClick={add}>Add</button></Link>}
                </div>
            </Route>
            <Route exact path="/mypokemon/:index">
                <div>
                    {
                        props.pokemonData.map((pokemon, i) => {
                            if (index === i.toString()) {
                                return (
                                    <div key={i}>
                                        <h1>{pokemon.name}</h1>
                                        <h1>{pokemon.id}</h1>
                                    </div>
                                )
                            }
                        })
                    } 
                    {props.handleRemove === undefined ? null : <Link to="/mypokemon/"><button onClick={remove}>Remove</button></Link>}
                </div>
            </Route>
        </Switch>
    </section>        
    )
}

export default PokemonInfo;
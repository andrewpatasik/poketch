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
                                function getDetailOfMoveAndTypes(categoryIndex, category, length) {
                                    let statList = []
                                    for (let index = 0; index < length; index++) {
                                        statList.push(pokemon[categoryIndex][index][category].name);
                                        // console.log(pokemon[categoryIndex][index][category].name);
                                    }

                                    return statList;
                                }

                                let moves = getDetailOfMoveAndTypes('moves', 'move', 3);
                                let types = getDetailOfMoveAndTypes('types', 'type', pokemon.types.length);
                                
                                return (
                                    <div key={id}>
                                        <img src={pokemon.image} />
                                        <h1>{pokemon.name}</h1>
                                        <ul>
                                            {moves.map((move, index) => <li key={index}>{move}</li>)}
                                        </ul>
                                        <ul>
                                            {types.map((type, index) => <li key={index}>{type}</li>)}
                                        </ul>
                                    </div>
                                )
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
                                function getDetailOfMoveAndTypes(categoryIndex, category, length) {
                                    let statList = []
                                    for (let index = 0; index < length; index++) {
                                        statList.push(pokemon[categoryIndex][index][category].name);
                                        // console.log(pokemon[categoryIndex][index][category].name);
                                    }

                                    return statList;
                                }

                                let moves = getDetailOfMoveAndTypes('moves', 'move', 3);
                                let types = getDetailOfMoveAndTypes('types', 'type', pokemon.types.length);
                                
                                return (
                                    <div key={i}>
                                        <img src={pokemon.image} />
                                        <h1>{pokemon.name}</h1>
                                        <ul>
                                            {moves.map((move, index) => <li key={index}>{move}</li>)}
                                        </ul>
                                        <ul>
                                            {types.map((type, index) => <li key={index}>{type}</li>)}
                                        </ul>
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
import React, { useState } from 'react';
import { useParams, Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import Modal from './Modal';

function PokemonInfo(props) {
    const { index } = useParams();
    
    const [showModal, setShowModal] = useState(false);

    function catchPokemon() {
        let caughtScore = Math.floor(Math.random() * 9);
        if (caughtScore >= 5) {
            // alert(`nice! your caught score is high (${caughtScore})`)
            return setShowModal(true);
        }
        alert(`Oh no! pokemon is fleed`)
        return false;
        // props.handleAdd(index);
    }

    function releasePokemon() {
        props.handleRelease(index);
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
                    { showModal ? <Modal pokeIndex={index} handleAdd={props.handleAdd} modalProps={setShowModal} pokemonData={props.myPokemonData}/> : null}
                    {props.handleAdd === undefined ? null : <button onClick={catchPokemon}>Catch</button>}
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
                                        <h1>{pokemon.nickname}</h1>
                                        <h3>{pokemon.name}</h3>
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
                    {props.handleRelease === undefined ? null : <Link to="/mypokemon/"><button onClick={releasePokemon}>Release</button></Link>}
                </div>
            </Route>
        </Switch>
    </section>        
    )
}

export default PokemonInfo;
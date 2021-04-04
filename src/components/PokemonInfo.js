import React, { useState } from 'react';
import { useParams, Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import Modal from './Modal';

function PokemonInfo({pokemonData, myPokemonData, handleAdd, handleRelease }) {
    const { index } = useParams();
    
    const [showModal, setShowModal] = useState(false);
    const [isPokemonFlee, setIsPokemonFlee] = useState(false);

    function catchPokemon() {
        let caughtScore = Math.floor(Math.random() * 9);
        if (caughtScore >= 5) {
            return setShowModal(true);
        }
        setIsPokemonFlee(true);
        setTimeout(()=> setIsPokemonFlee(false), 1000)
        
        return false;
    }

    function releasePokemon() {
        handleRelease(index);
    }

    return (
        <Switch>
            <Route exact path="/pokedex/:index">
                <section>
                { showModal ? <div className="back-drop"></div> : null}
                {
                        pokemonData.map(pokemon => {
                            let id = pokemon.id.toString();
                            if (index === id) {
                                function getDetailOfMoveAndTypes(categoryIndex, category, length) {
                                    let statList = []
                                    
                                    if (pokemon[categoryIndex].length === 0) {
                                        return null;
                                    }

                                    for (let index = 0; index < length; index++) {
                                        statList.push(pokemon[categoryIndex][index][category].name);
                                    }

                                    return statList;
                                }

                                let moves = getDetailOfMoveAndTypes('moves', 'move', 3);
                                let types = getDetailOfMoveAndTypes('types', 'type', pokemon.types.length);
                                
                                return (
                                    <div className="pokemon-info" key={id}>
                                        <div className="above-section flex">
                                           <div>
                                            <img src={pokemon.image} />
                                                <h1>{pokemon.name}</h1>
                                                <ul className="pokemon-types flex">
                                                    {types.map((type, index) => <li key={index}>{type}</li>)}
                                                </ul>
                                           </div>
                                        </div>
                                        <div className="below-section flex">
                                            <h3 className="pokemon-moves-headline">Moves:</h3>
                                            <ul className="pokemon-moves">
                                                {moves !== null ? moves.map((move, index) => <li key={index}>{move}</li>) : "Moves not found"}
                                            </ul>
                                        </div>
                                        {isPokemonFlee ? <div className="pokemon-fleed flex centered"><h1>Failed to catch, pokemon run away</h1></div> : null}
                                        {handleAdd === undefined ? null : <button className="btn catch-btn" onClick={catchPokemon}>Catch</button>}
                                    </div>
                                )
                            }
                        })
                    } 
                { showModal ? <Modal pokeIndex={index} handleAdd={handleAdd} modalProps={setShowModal} pokemonData={myPokemonData}/> : null}
                </section>
            </Route>
            <Route exact path="/mypokemon/:index">
                <section>
                    {
                        pokemonData.map((pokemon, i) => {
                            if (index === i.toString()) {
                                function getDetailOfMoveAndTypes(categoryIndex, category, length) {
                                    let statList = []

                                    if (pokemon[categoryIndex].length === 0) {
                                        return null;
                                    }

                                    for (let index = 0; index < length; index++) {
                                        statList.push(pokemon[categoryIndex][index][category].name);
                                    }

                                    return statList;
                                }

                                let moves = getDetailOfMoveAndTypes('moves', 'move', 3);
                                let types = getDetailOfMoveAndTypes('types', 'type', pokemon.types.length);
                                
                                return (
                                    <div className="pokemon-info" key={i}>
                                        <div className="above-section flex">
                                            <div>
                                                <img src={pokemon.image} />
                                                <h1>{pokemon.nickname}</h1>
                                                <h3>{pokemon.name}</h3>
                                                <ul className="pokemon-types flex">
                                                    {types.map((type, index) => <li key={index}>{type}</li>)}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="below-section flex">
                                        <h3 className="pokemon-moves-headline">Moves:</h3>
                                        <ul className="pokemon-moves">
                                            {moves !== null ? moves.map((move, index) => <li key={index}>{move}</li>) : "Moves not found"}
                                        </ul>
                                        </div>
                                        {handleRelease === undefined ? null : <Link to="/mypokemon/"><button className="btn release-btn" onClick={releasePokemon}>Release</button></Link>}
                                    </div>
                                )
                            }
                        })
                    } 
                    
                </section>
            </Route>
        </Switch>    
    )
}

export default PokemonInfo;
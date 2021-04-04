import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router';

function PokemonCard({name, id, myPokemonCounter}) {
    const [ownedPokemon, setOwnedPokemon] = useState([]);

    useEffect(() => {
        let counter = myPokemonCounter.reduce((obj, current) => {
            if (!obj[current]) {
                obj[current] = 0
            }
            obj[current]++;
            return obj;
        }, {})

        setOwnedPokemon(counter)
    },[])

    return (
        <Switch>
            <Route exact path="/poketch/">
                <div className="grid-item flex">
                    <h1 className="card-headline">{name}</h1>
                    <h3>Owned: {ownedPokemon[id]}</h3>
                </div>
            </Route>            
            <Route path="/poketch/mypokemon">
                <div className="grid-item flex">
                    <h1 className="card-headline">{name}</h1>
                </div>
            </Route>
        </Switch>
    )
}

export default PokemonCard;
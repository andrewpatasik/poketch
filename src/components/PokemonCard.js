import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router';

function PokemonCard(props) {
    const [ownedPokemon, setOwnedPokemon] = useState([]);

    useEffect(() => {
        const data = localStorage.getItem('my-owned-pokemon-list');
        if (data) {
            setOwnedPokemon(JSON.parse(data))
        }
    }, [])
    
    useEffect(() => {
        localStorage.setItem("my-owned-pokemon-list", JSON.stringify(ownedPokemon))
    })

    useEffect(() => {
        let counter = props.myPokemonCounter.reduce((obj, current) => {
            if (!obj[current]) {
                obj[current] = 0
            }
            obj[current]++;
            return obj;
        }, {})

        setOwnedPokemon(counter)
        // console.log(ownedPokemon)
    },[])

    return (
        <Switch>
            <Route exact path="/">
                <div className="grid-item flex">
                    <h1 className="card-headline">{props.name}</h1>
                    <h3>Owned: {ownedPokemon[props.id]}</h3>
                </div>
            </Route>            
            <Route path="/mypokemon">
                <div className="grid-item flex">
                    <h1 className="card-headline">{props.name}</h1>
                </div>
            </Route>
        </Switch>
    )
}

export default PokemonCard;
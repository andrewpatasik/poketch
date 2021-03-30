import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import PokemonListLayout from './PokemonListLayout';
import PokemonInfo from './PokemonInfo';

function App() {
     const [myPokemonList, setMyPokemonList] = useState([]);

    function handleAdd(index) {
        setMyPokemonList([...myPokemonList, index])
    }

    return ( 
        <Router>
            <Nav />
            <Switch>
                <Route exact path="/">
                    <PokemonListLayout pokemonData={[1,2,3]}/>               
                </Route>
                <Route path="/mypokemon">
                    <PokemonListLayout pokemonData={myPokemonList} />               
                </Route>
                <Route path="/pokedex/:index">
                    <PokemonInfo handleAdd={handleAdd}/>               
                </Route>
            </Switch>
        </Router>
        );
}
 
export default App;
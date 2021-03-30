import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import PokemonListLayout from './PokemonListLayout';
import PokemonInfo from './PokemonInfo';

function App() {
     const [myPokemonList, setMyPokemonList] = useState([]);

    function handleAdd(index) {
        setMyPokemonList([...myPokemonList, index])
        
    }

    function handleRemove(index) {
        let values = [...myPokemonList]
        values.splice(index, 1);
        setMyPokemonList(values);
    }

    return ( 
        <Router>
            <Nav />
            <Switch>
                <Route exact path="/">
                    <PokemonListLayout pokemonData={[1,2,3]}/>               
                </Route>
                <Route exact path="/mypokemon">
                    <PokemonListLayout pokemonData={myPokemonList} />               
                </Route>
                <Route path="/mypokemon/:index">
                    <PokemonInfo handleRemove={handleRemove}/>               
                </Route>
                <Route path="/pokedex/:index">
                    <PokemonInfo handleAdd={handleAdd}/>               
                </Route>
                <Route exact path="/pokedex/">
                    <Redirect to="/"/>              
                </Route>
            </Switch>
        </Router>
        );
}
 
export default App;
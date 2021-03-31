import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import PokemonListLayout from './PokemonListLayout';
import PokemonInfo from './PokemonInfo';

function App() {
    const [pokemonList, setPokemonList] = useState([]);
    const [myPokemonList, setMyPokemonList] = useState([]);

    useEffect(() => {
        async function requestPokemon(url) {
            const request = await fetch(url);
            const response = await request.json();
    
            return response;
        }

        async function generatePokemon() {
            const request = await requestPokemon('https://pokeapi.co/api/v2/pokemon/?limit=3&offset=0')
            const pokemonDetail = await getPokemonInfo(request.results)
            setPokemonList(pokemonDetail);
        }
    
        function getPokemonInfo(array) {
            let list = [];
            let pokemonData = new Promise((resolve, reject) => {
                array.forEach(pokemon => {
                    let details = Promise.resolve(requestPokemon(pokemon.url))
                    details
                        .then(function onfulfilled(data) {
                            let {id, name, moves, types, sprites} = data;
                            list.push({id: id, name: name, moves: moves, types: types, image: sprites.front_default});
                        })
                })
                    setTimeout(() => {
                        resolve(list)
                        // console.log(list)
                    }, 1000)
            })
            return pokemonData;
        }

        generatePokemon()
    }, [])

    function handleAdd(index) {
        let values;
        pokemonList.map(pokemon => {
            if (pokemon.id.toString() === index) {
                let { id, name, moves, types, image } = pokemon;
                setMyPokemonList([...myPokemonList, {id: id, name: name, moves: moves, types: types, image: image}])
                // console.log(id, name, types[0].type.name)
                // console.log(myPokemonList)
            }
        })
        
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
                    <PokemonListLayout pokemonData={pokemonList}/>               
                </Route>
                <Route exact path="/mypokemon">
                    <PokemonListLayout pokemonData={myPokemonList} />               
                </Route>
                <Route exact path="/pokedex/">
                    <Redirect to="/"/>              
                </Route>
                <Route path="/mypokemon/:index">
                    <PokemonInfo pokemonData={myPokemonList} handleRemove={handleRemove}/>               
                </Route>
                <Route path="/pokedex/:index">
                    <PokemonInfo pokemonData={pokemonList} handleAdd={handleAdd}/>               
                </Route>
            </Switch>
        </Router>
        );
}
 
export default App;
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import PokemonListLayout from './PokemonListLayout';
import PokemonInfo from './PokemonInfo';

function App() {
    const [pokemonList, setPokemonList] = useState([]);
    const [myPokemonList, setMyPokemonList] = useState([]);
    const [myPokemonCounter, setMyPokemonCounter] = useState([]);

    // fetching poke API after mounted
    useEffect(() => {
        generatePokemon()
    }, [])

    async function requestPokemon(url) {
        const request = await fetch(url);
        const response = await request.json();

        return response;
    }

    function getPokemonInfo(array) {
        let list = [];
        let pokemonData = new Promise((resolve) => {
            array.forEach(pokemon => {
                let details = Promise.resolve(requestPokemon(pokemon.url))
                details
                    .then(function onfulfilled(data) {
                        let {id, name, moves, types, sprites} = data;
                        list.push({id: id, name: name, nickname: '', moves: moves, types: types, image: sprites.front_default});
                    })
            })
                setTimeout(() => {
                    resolve(list)
                }, 1000)
        })
        return pokemonData;
    }

    async function generatePokemon(startedIndex = 0) {
        const request = await requestPokemon(`https://pokeapi.co/api/v2/pokemon/?limit=3&offset=${startedIndex}`)
        const pokemonDetail = await getPokemonInfo(request.results)
        setPokemonList(pokemonDetail);
    }

    // to persist my pokemon list
    useEffect(() => {
        const data = localStorage.getItem('my-pokemon-list');
        if (data) {
            setMyPokemonList(JSON.parse(data))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("my-pokemon-list", JSON.stringify(myPokemonList))
    })

    function handleAdd(index, nickname) {
        pokemonList.map(pokemon => {
            if (pokemon.id.toString() === index) {
                let { id, name, moves, types, image } = pokemon;
                setMyPokemonList([...myPokemonList, {id: id, name: name, nickname: nickname, moves: moves, types: types, image: image}])
                setMyPokemonCounter([...myPokemonCounter, index])
            }
        })
        
    }

    function handleRelease(index) {
        let myPokemonListValue = [...myPokemonList]
        let myPokemonCounterValue = [...myPokemonCounter]
        
        myPokemonListValue.splice(index, 1);
        setMyPokemonList(myPokemonListValue);

        myPokemonCounterValue.splice(index, 1);
        setMyPokemonCounter(myPokemonCounterValue);
    }

    function handleGenerateRandomPokemon(startIndex) {
        generatePokemon(startIndex)
    }

    return ( 
        <div className="main">
            <Router>
                <Nav />
                <Switch>
                    <Route exact path="/">
                        <PokemonListLayout 
                            pokemonData={pokemonList} 
                            myPokemonCounter={myPokemonCounter} 
                            handleGenerateRandomPokemon={handleGenerateRandomPokemon}/>               
                    </Route>
                    <Route exact path="/mypokemon">
                        <PokemonListLayout 
                            pokemonData={myPokemonList} 
                            myPokemonCounter={myPokemonCounter} />               
                    </Route>
                    <Route exact path="/pokedex/">
                        <Redirect to="/"/>              
                    </Route>
                    <Route path="/mypokemon/:index">
                        <PokemonInfo 
                            pokemonData={myPokemonList} 
                            handleRelease={handleRelease}/>               
                    </Route>
                    <Route path="/pokedex/:index">
                        <PokemonInfo 
                            pokemonData={pokemonList} 
                            myPokemonData={myPokemonList} 
                            handleAdd={handleAdd}/>               
                    </Route>
                </Switch>
            </Router>
            <div className="footer">
                <a href="https://github.com/andrewpatasik/poketch" target="_blank">andrewpatasik.github.io</a>
            </div>
        </div>
        );
}
 
export default App;
import React from 'react';
import { useParams } from 'react-router';
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
        <div>
            Pokedex
            {index}
            {props.handleAdd === undefined ? null : <Link to="/"><button onClick={add}>Add</button></Link>}
            {props.handleRemove === undefined ? null : <Link to="/mypokemon/"><button onClick={remove}>Remove</button></Link>}
        </div>
    )
}

export default PokemonInfo;
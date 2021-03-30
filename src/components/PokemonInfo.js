import React from 'react';
import { useParams } from 'react-router';

function PokemonInfo(props) {
    const { index } = useParams();

    function add() {
        props.handleAdd(index);
    }

    return (
        <div>
            Pokedex
            {index}
            <button onClick={add}>Add</button>
        </div>
    )
}

export default PokemonInfo;
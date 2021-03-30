import React from 'react';

function PokemonCard(props) {
    return (
        <div className="grid-item">{props.detail}</div>
    )
}

export default PokemonCard;
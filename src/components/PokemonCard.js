import React from 'react';

function PokemonCard(props) {
    return (
        <div className="grid-item flex">
            <h1 className="card-headline">{props.detail}</h1>
        </div>
    )
}

export default PokemonCard;
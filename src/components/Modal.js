import React, { useEffect, useState } from 'react';

function Modal({ pokeIndex, handleAdd, modalProps, pokemonData }) {

    const [nickname, setNickname] = useState('');

    function handleNicknameField(event) {
        let nameValue = event.target.value;
        setNickname(nameValue);
    }

    function addToMyPokemon() {
        let isTaken = validateNickName(pokemonData, nickname)
    
        if (isTaken) {
            alert("nickname is already taken")
            return
        }

        handleAdd(pokeIndex, nickname)
        modalProps(false);
    }

    function validateNickName(data, value) {
        if (data.find(pokemon => pokemon.nickname === value)) {
            return true
        } else {
            return false
        }
    }

    return(
        <div className="modal-container border">
            <div className="modal-content">
                <h2>Yeay! You've caught a Pokemon</h2>
                <p>What your new pokemon should be called?</p>
                <input type="text" name="nickname" value={nickname} onChange={handleNicknameField} placeholder="enter pokemon name..."/>
                <button onClick={addToMyPokemon}>OK</button>
            </div>
        </div>
    )
}

export default Modal;
import React, { useEffect, useState } from 'react';

function Modal({ pokeIndex, handleAdd, modalProps, pokemonData }) {

    const [nickname, setNickname] = useState('');
    const [isTaken, setIsTaken] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    function handleNicknameField(event) {
        let nameValue = event.target.value;
        setNickname(nameValue);
    }

    function addToMyPokemon() {
        let takenStatus = validateNickName(pokemonData, nickname)
        
        if (takenStatus) {
            setIsTaken(true)
            setIsEmpty(false)
            // alert("nickname is already taken")
            return
        } else if (nickname === "") {
            setIsEmpty(true)
            setIsTaken(false);
            // alert("nickname cannot be empty")
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
        <div className="modal-container centered flex flex-centered">
            <div className="modal-content">
                <h2>Yeay! You've caught a Pokemon</h2>
                <p>What your new pokemon should be called?</p>
                <div>
                    <input className="input-nickname" type="text" name="nickname" value={nickname} onChange={handleNicknameField} placeholder="enter pokemon name..."/>
                    <button className="btn add-btn" onClick={addToMyPokemon}>OK</button>
                </div>
                <p>{isTaken ? "nickname is already taken" : null}</p>
                <p>{isEmpty ? "nickname cannot be empty" : null}</p>
            </div>
        </div>
    )
}

export default Modal;
import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {

    return (
        <nav>
            <ul>
                <li><Link to="/">Poketch</Link></li>
                <li><Link to="/mypokemon">My Pokemon</Link></li>
            </ul>
        </nav>
    )
}

export default Nav;
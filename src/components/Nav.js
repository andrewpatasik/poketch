import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {

    return (
        <nav>
            <ul>
                <li><Link className="nav-link" to="/poketch/">Catch Pokemon</Link></li>
                <li><h1 className="logo">Poketch</h1></li>
                <li><Link className="nav-link" to="/poketch/mypokemon">My Pokemon</Link></li>
            </ul>
        </nav>
    )
}

export default Nav;
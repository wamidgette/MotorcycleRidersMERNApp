import React from 'react';
import {Link} from 'react-router-dom';

function Header (props){
    return(
        <header>
            <h1>This is the Header</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/trips">Trips</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/riders">Riders</Link></li>
                <li><Link to="/motorcycles">Motorcycles</Link></li>
            </ul>
        </header>
    )
}

export default Header;
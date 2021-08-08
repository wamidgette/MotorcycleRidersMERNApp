import React from 'react';
import {Link} from 'react-router-dom';

function Header (props){
    return(
        <header>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/" className="navbar-brand">This is the Header</a>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/trips">Trips</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/events">Events</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/riders">Riders</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/motorcycles">Motorcycles</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
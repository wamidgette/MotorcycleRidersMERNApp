import React from 'react';
import {Link} from 'react-router-dom';
import "../css/App.scss";
import motorycleImage from "../images/motorcycleSketch2.png";
function Header (props){
    return(
        <header className="header">
            <div>
                <h2><a href="/" className="siteTitle">Ontario Riders</a></h2>
                <img src={motorycleImage} alt="motorcycle image" className="headerImage"/>
            </div>
            <nav id="nav" className="nav">
            <Link className = "navLink" to="/">Home</Link>
            <Link className = "navLink" to="/trips">Trips</Link>
            <Link className = "navLink" to="/events">Events</Link>
            <Link className = "navLink" to="/riders">Riders</Link>
            <Link className = "navLink" to="/motorcycles">Motorcycles</Link>
            </nav>
        </header>
    )
}
export default Header;
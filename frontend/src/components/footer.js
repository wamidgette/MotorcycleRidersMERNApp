import React from 'react';
import {Link} from 'react-router-dom';
import "../css/App.scss"
import motorycleImage from "../images/motorcycleSketch.png";


function Footer (props){
    return(
        <footer className = "footer">
            <h2>This is a footer</h2>
            <img src = {motorycleImage} alt ="image of motorcycle"/>
        </footer>
    )
}

export default Footer;
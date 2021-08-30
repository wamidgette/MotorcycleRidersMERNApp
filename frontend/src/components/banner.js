import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react";
import tripsImage from "../images/banner/trips.jpg"


function Banner (props){
    /* Set dynamic url for banner image depending on the collection user is currently on (trips, events etc) */
    return(
        <>
        <div className = "banner">
            <h1 className = "pageTitle">Trips</h1>
            {/* Switch loads the banner image corresponding to the props.collection passed to this function */}
            <img className = "bannerImage" src={tripsImage} alt=""/>
        </div>
        </>
    )
}

export default Banner;
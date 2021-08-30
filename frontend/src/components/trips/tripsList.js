import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react"
import tripsData from '../../controllers/tripController.js'
import image from "../../images/node.png"
import Banner from "../banner.js"
function TripsList (props){
    
    const [trips, setTrips] = useState([])
    const collection = "trips";
    /* function sends get request to node api method getTrips */ 
    useEffect(()=>
        {tripsData.getAll()
        .then(response => {
            console.log(response.data);
            setTrips(response.data)
        })},
        []
    )

    props.editTrip(null);

    return(
        <>
        <main>
            <Banner collection = {collection}/>
            {/* Link to add new trip */}
            <div className = "filterBox">
                <p>Have a look through the trips we have coming up!</p>
                <Link to={"/trips/addTrip"} className = "boxLink">Add Trip</Link>
            </div>
            {/* Print out trips */}
            <div className = "boxContainer">
                {trips.map((trip)=>{
                    return(
                    <div className="box">
                        <div className = "imageContainer">
                            <img src={image} alt="motorcycle image"/>
                        </div>
                        <h3 className="boxTitle">{trip.trip_name}</h3>
                        <p className = "boxParagraph">{trip.trip_start} to {trip.trip_end}</p>
                        <Link to={"/trips/"+trip._id} className = "boxLink">Details</Link>
                    </div>
                    )
                })}
            </div>
        </main>
        </>
    )
}

export default TripsList;
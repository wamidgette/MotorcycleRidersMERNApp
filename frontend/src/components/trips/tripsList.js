import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react"
import tripsData from '../../controllers/tripController.js'

function TripsList (props){
    
    const [trips, setTrips] = useState([])
    
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
            <h1>Trips content</h1>
            {/* Link to add new trip */}
            <Link to={"/trips/addTrip"} className = "btn btn-primary col-lg-5 mx-1 mb-1">Add Trip</Link>
            {/* Print out trips */}
            <div className = "row">
                {trips.map((trip)=>{
                    return(
                    <div className="col-lg-4 pb-1">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">{trip.trip_name}</h3>
                                <p>{trip.trip_start} to {trip.trip_end}</p>
                                <Link to={"/trips/"+trip._id} className = "btn btn-primary col-lg-5 mx-1 mb-1">Details</Link>
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
        </main>
        </>
    )
}

export default TripsList;
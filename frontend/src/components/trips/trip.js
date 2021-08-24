import {Link, useParams} from 'react-router-dom';
import React,{useState, useEffect} from "react"
import tripsData from '../../controllers/tripController.js'

function Trip (props){
    /* Initial trip value */
    const initialTrip = {
        _id : null,
        trip_name: "",
        trip_start: "",
        trip_end : "",
        start_location : "",
        end_location : ""
      };
    
    
      /* Usestate for trip object */
    const [trip, setTrip] = useState(initialTrip)

    /* Get the trip id from the url */
    let tripId = window.location.pathname.split("/")[2]

    /* If the tripId value changes, send request to database for the trip corresponding to the new id*/ 
    useEffect(()=>
        {tripsData.getById(tripId)
        .then(response => {
            console.log(response.data);
            setTrip(response.data)
        })},
        [tripId]
    )

    /* Set the trip to edit on the app.js hook to the current trip */
    props.editTrip(trip)

    console.log(trip)

    return(
        <>
        <main>
            <h1>Trip Details</h1>
            {/* Print out trips */}
            <div className="col-lg-4 pb-1">
                <div className="card center">
                    <h1>{trip.trip_name}</h1>
                    <ul>
                        <li>Trip Starts: {trip.trip_start}</li>    
                        <li>Trip Ends: {trip.trip_end}</li>    
                        <li>Start Location: {trip.start_location}</li>    
                        <li>End Location: {trip.end_location}</li>    
                        {/* Link to update page sending the current trip as state data */}
                        <Link to={"/trips/addTrip"} className = "btn btn-primary col-lg-5 mx-1 mb-1">Update</Link>
                        <Link to={"/trips/delete"} className = "btn btn-primary col-lg-5 mx-1 mb-1">Delete</Link>
                    </ul>
                </div>
            </div>    
        </main>
        </>
    )
}

export default Trip;
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
            <div className="boxContainer">
                <div className="box">
                    <h2 className = "boxBlock">{trip.trip_name}</h2>
                    <ul className = "boxBlock">
                        <li><strong>Trip Starts: </strong>{trip.trip_start}</li>    
                        <li><strong>Trip Ends: </strong>{trip.trip_end}</li>    
                        <li><strong>Start Location: </strong>{trip.start_location}</li>    
                        <li><strong>End Location:</strong> {trip.end_location}</li>    
                        {/* Link to update page sending the current trip as state data */}
                    </ul>
                    <Link to={"/trips/addTrip"} className = "boxLink">Update</Link>
                    <Link to={"/trips/delete"} className = "secondaryBoxLink">Delete</Link>
                </div>
            </div>   
        </main>
        </>
    )
}

export default Trip;
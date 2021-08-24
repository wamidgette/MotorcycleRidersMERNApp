import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react"
import tripsData from '../../controllers/tripController.js'

const DeleteTrip = props => {

    /* Initial - set edit to falsey and trip to empty string */
    let trip = props.trip
    console.log(trip)
    const [submitted, setSubmitted] = useState(false) 

    /* Initial trip properties */
    const tripId = trip._id
    console.log(trip._id)
    const tripName = trip.trip_name
    const tripStart = trip.trip_start
    const tripEnd = trip.trip_end
    const startLocation = trip.start_location
    const endLocation = trip.end_location
    
    /* If not, edit = false and keep object empty as initial */
    
    /* Define functions for adding and updating a trip */
    const deleteTrip = () => {
        alert("delete trip triggered")

        /* Can have validation here later - return false if any errors*/

        /* Delete the trip */
        tripsData.deleteTrip(tripId).then(
            response => {
                setSubmitted(true);
                console.log(response.data);
        }).catch(e => {
            console.log(e)
        });
    };

    /* Render the object properties in a form for client*/
    return(
    <>
        <main>
            {/* If edit = true title is Edit trip, else it is add trip */}
            {trip? (<h1>Delete This Trip?</h1>) : (<h1>No Trip Selected</h1>)}
            {/* Form submitted? */}
            {submitted? (
                <h3>Trip has been deleted</h3>
            ) : (/* else, render form for user to update/add based on object properties */
                <div className="row">                    
                <div className="col-lg-4 pb-1">
                    <div className="card ">
                        <div className="card-body">
                            {/* If editing, object id will already be set, else do not include */}
                            {trip? (
                                <div>
                                    <input hidden value = {tripId}></input>
                                    <h3>{tripName}</h3>
                                    <button onClick={deleteTrip} className="btn btn-success">Delete Trip</button>
                                    <Link to="/trips">Back to Trips</Link>
                                </div>) : (
                                <div>
                                    <div>No trip has been selected</div>
                                    <Link to="/trips">Back to Trips</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                </div>    
            )}
            
        </main>
    </>
    )
}

export default DeleteTrip;
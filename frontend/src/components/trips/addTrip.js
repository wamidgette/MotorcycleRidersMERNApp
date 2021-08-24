import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react"
import tripsData from '../../controllers/tripController.js'

const AddTrip = props => {

    /* Initial - set edit to falsey and trip to empty string */
    let edit
    let trip = ""

    /* Set edit = true if object passed and update initial object to the object passed */
    if(props.trip !== null){
        edit = true
        trip = props.trip
    }

    /* Initial trip properties */
        const [tripId, setTripId] = useState(trip._id)
        const [tripName, setTripName] = useState(trip.trip_name)
        const [tripStart, setTripStart] = useState(trip.trip_start)
        const [tripEnd, setTripEnd] = useState(trip.trip_end)
        const [startLocation, setStartLocation] = useState(trip.start_location)
        const [endLocation, setEndLocation] = useState(trip.end_location)

        const [submitted, setSubmitted] = useState(false) 

        
        /* If not, edit = false and keep object empty as initial */
        
        /* Define functions for adding and updating a trip */
        const saveTrip = () => {
            alert("add trip triggered")

            /* Can have validation here later - return false if any errors*/

            let data = {
                trip_name : tripName,
                trip_start : tripStart,
                trip_end : tripEnd,
                end_location : endLocation,
                start_location : startLocation
            }

            /* If user is editing, add the tripId to the data and call the edit/update method */
            if(edit){
                data._id = tripId
                console.log(data)
                tripsData.edit(data).then(
                    response => {
                        setSubmitted(true);
                        console.log(response.data);
                }).catch(e => {
                    console.log(e)
                });
            }

            /* If user is not editing call the add method */
            else{
                console.log(data)
                tripsData.add(data).then(
                    response => {
                        setSubmitted(true);
                        console.log(response.data);
                }).catch(e => {
                    console.log(e)
                });
            }
        };

        /* Functions to update the current trip object as user makes changes to input fields */
        const nameValueChange = event => {
            setTripName(event.target.value);
        };
        const startDateValueChange = event => {
            setTripStart(event.target.value);
        };
        const endDateValueChange = event => {
            setTripEnd(event.target.value);
        };
        const startLocationChange = event => {
            setStartLocation(event.target.value);
        };
        const endLocationChange = event => {
            setEndLocation(event.target.value);
        };

        /* Render the object properties in a form for client*/
        return(
        <>
            <main>
                {/* If edit = true title is Edit trip, else it is add trip */}
                {edit? (<h1>Update Trip</h1>) : (<h1>Add Trip</h1>)}
                {/* Form submitted? */}
                {submitted? (
                    <h3>Trip has been submitted</h3>
                ) : (/* else, render form for user to update/add based on object properties */
                    <div className="row">                    
                    <div className="col-lg-4 pb-1">
                        <div className="card ">
                            <div className="card-body">
                                {/* If editing, object id will already be set, else do not include */}
                                {edit? (
                                    <div>
                                        <input hidden value = {tripId}></input>
                                    </div>) : (
                                    ""
                                )}
                                <div>
                                    <label htmlFor="">Trip Name: </label>
                                    <input type="text" onChange={nameValueChange} value = {tripName}></input>
                                </div>
                                <div>
                                    <label htmlFor="">Start Location: </label>
                                    <input type="text" onChange={startLocationChange} value = {startLocation}></input>
                                </div>
                                <div>
                                    <label htmlFor="">End Location: </label>
                                    <input type="text" onChange={endLocationChange} value = {endLocation}></input>
                                </div>
                                <div>
                                    <label htmlFor="">Start Date: </label>
                                    <input type="date" onChange={startDateValueChange} value = {tripStart}></input>
                                </div>
                                <div>
                                    <label htmlFor="">End Date: </label>
                                    <input type="date" onChange={endDateValueChange} value = {tripEnd}></input>
                                </div>
                                {/* Edit? Show an update button that calls the update function and update db method. If not, show an add button that calls the add function db method */}
                                {edit? (<button onClick={saveTrip} className="btn btn-success">Update Trip</button>) : (<button onClick={saveTrip} className="btn btn-success">Add Trip</button>)}
                            </div>
                        </div>
                    </div>
                    </div>    
                )}
                
            </main>
        </>
    )
}

export default AddTrip;
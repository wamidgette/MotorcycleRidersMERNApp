import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react"
import eventsData from '../../controllers/eventController.js'

const AddEvent = props => {

    /* Initial - set edit to falsey and trip to empty string */
    let edit
    let event = ""
    /* Track if form has been submitted with binary value */
    const [submitted, setSubmitted] = useState(false) 

    /* Set edit = true if object passed and update initial object to the object passed */
    if(props.event !== null){
        edit = true
        event = props.event
    }

    /* Initial event properties */
    const [eventId, setEventId] = useState(event._id)
    const [eventName, setEventName] = useState(event.event_name)
    const [eventStart, setEventStart] = useState(event.event_start)
    const [eventEnd, setEventEnd] = useState(event.event_end)
    const [eventLocation, setEventLocation] = useState(event.event_location)

    /* Define function for adding and updating a event */
    const saveEvent = () => {
        alert("add event triggered")

        /* Can have validation here later - return false if any errors*/
        let data = {
            event_name : eventName,
            event_start : eventStart,
            event_end : eventEnd,
            event_location : eventLocation,
        }

        /* If user is editing, add the eventId to the data and call the edit/update method */
        if(edit){
            data._id = eventId
            console.log(data)
            eventsData.updateEvent(data).then(
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
            eventsData.createEvent(data).then(
                response => {
                    setSubmitted(true);
                    console.log(response.data);
            }).catch(e => {
                console.log(e)
            });
        }
    };

    /* Functions to update the current event object as user makes changes to input fields */
    const nameValueChange = event => {
        setEventName(event.target.value);
    };
    const startDateValueChange = event => {
        setEventStart(event.target.value);
    };
    const endDateValueChange = event => {
        setEventEnd(event.target.value);
    };
    const eventLocationChange = event => {
        setEventLocation(event.target.value);
    };


    /* Render the object properties in a form for client*/
    return(
        <>
            <main>
                {/* If edit = true title is Edit event, else it is add event */}
                {edit? (<h1>Update Event</h1>) : (<h1>Add Event</h1>)}
                {/* Form submitted? */}
                {submitted? (
                    <h3>Event has been submitted</h3>
                ) : (/* else, render form for user to update/add based on object properties */
                    <div className="row">                    
                    <div className="col-lg-4 pb-1">
                        <div className="card ">
                            <div className="card-body">
                                {/* If editing, object id will already be set, else do not include */}
                                {edit? (
                                    <div>
                                        <input hidden value = {eventId}></input>
                                    </div>) : (
                                    ""
                                )}
                                <div>
                                    <label htmlFor="">Event Name: </label>
                                    <input type="text" onChange={nameValueChange} value = {eventName}></input>
                                </div>
                                <div>
                                    <label htmlFor="">Start Location: </label>
                                    <input type="text" onChange={eventLocationChange} value = {eventLocation}></input>
                                </div>
                                <div>
                                    <label htmlFor="">Start Date: </label>
                                    <input type="date" onChange={startDateValueChange} value = {eventStart}></input>
                                </div>
                                <div>
                                    <label htmlFor="">End Date: </label>
                                    <input type="date" onChange={endDateValueChange} value = {eventEnd}></input>
                                </div>
                                {/* Edit? Show an update button that calls the update function and update db method. If not, show an add button that calls the add function db method */}
                                {edit? (<button onClick={saveEvent} className="btn btn-success">Update Event</button>) : (<button onClick={saveEvent} className="btn btn-success">Add Event</button>)}
                            </div>
                        </div>
                    </div>
                    </div>    
                )}
            </main>
        </>
    )
}

export default AddEvent;
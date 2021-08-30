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
    const nameValueChange = e => {
        setEventName(e.target.value);
    };
    const startDateValueChange = e => {
        setEventStart(e.target.value);
    };
    const endDateValueChange = e => {
        setEventEnd(e.target.value);
    };
    const eventLocationChange = e => {
        setEventLocation(e.target.value);
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
                    <div className="boxContainer">                    
                        <div className="box ">
                                {/* If editing, object id will already be set, else do not include */}
                                {edit? (
                                    <>
                                        <h3 className = "boxTitle">Update This Event</h3>
                                        <input hidden value = {eventId}></input>
                                    </>) : (
                                        <h3 className = "boxTitle">Add an Event</h3>
                                )}
                                <div className = "boxBlock">
                                    <label htmlFor="">Event Name: </label>
                                    <input type="text" onChange={nameValueChange} value = {eventName}></input>
                                </div>
                                <div className = "boxBlock">
                                    <label htmlFor="">Event Location: </label>
                                    <input type="text" onChange={eventLocationChange} value = {eventLocation}></input>
                                </div>
                                <div className = "boxBlock">
                                    <label htmlFor="">Start Date: </label>
                                    <input type="date" onChange={startDateValueChange} value = {eventStart}></input>
                                </div>
                                <div className = "boxBlock">
                                    <label htmlFor="">End Date: </label>
                                    <input type="date" onChange={endDateValueChange} value = {eventEnd}></input>
                                </div>
                                {/* Edit? Show an update button that calls the update function and update db method. If not, show an add button that calls the add function db method */}
                                {edit? (<button onClick={saveEvent} className="boxLink">Update Event</button>) : (<button onClick={saveEvent} className="boxLink">Add Event</button>)}
                        </div>
                    </div>
                )}
            </main>
        </>
    )
}

export default AddEvent;
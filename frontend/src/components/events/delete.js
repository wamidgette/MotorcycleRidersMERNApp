import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react"
import eventsData from '../../controllers/eventController.js'

const DeleteEvent = props => {

    /* Initial - set edit to falsey and event to empty string */
    let event = props.event
    console.log(event)
    const [submitted, setSubmitted] = useState(false) 

    /* Initial event properties */
    const eventId = event._id
    console.log(event._id)
    const eventName = event.event_name
    const eventStart = event.event_start
    const eventEnd = event.event_end
    const startLocation = event.start_location
    const endLocation = event.end_location
    
    /* If not, edit = false and keep object empty as initial */
    
    /* Define functions for adding and updating a event */
    const deleteEvent = () => {
        alert("delete event triggered")

        /* Can have validation here later - return false if any errors*/

        /* Delete the event */
        eventsData.deleteEvent(eventId).then(
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
            {/* If edit = true title is Edit event, else it is add event */}
            {event? (<h1>Delete This Event?</h1>) : (<h1>No Event Selected</h1>)}
            {/* Form submitted? */}
            {submitted? (
                <h3>Event has been deleted</h3>
            ) : (/* else, render form for user to update/add based on object properties */
                <div className="row">                    
                <div className="col-lg-4 pb-1">
                    <div className="card ">
                        <div className="card-body">
                            {/* If editing, object id will already be set, else do not include */}
                            {event? (
                                <div>
                                    <input hidden value = {eventId}></input>
                                    <h3>{eventName}</h3>
                                    <button onClick={deleteEvent} className="btn btn-success">Delete Event</button>
                                    <Link to="/events">Back to Events</Link>
                                </div>) : (
                                <div>
                                    <div>No event has been selected</div>
                                    <Link to="/event">Back to Events List</Link>
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

export default DeleteEvent;
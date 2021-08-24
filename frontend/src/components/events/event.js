import {Link, useParams} from 'react-router-dom';
import React,{useState, useEffect} from "react"
import eventsData from '../../controllers/eventController.js'

function Event (props){
    /* Initial event value */
    const initialEvent = {
        _id : null,
        event_name: "",
        event_start: "",
        event_end : "",
        event_location : "",
      };
    
      /* Usestate for event object */
    const [event, setEvent] = useState(initialEvent)

    /* Get the event id from the url */
    let eventId = window.location.pathname.split("/")[2]

    /* If the eventId value changes, send request to database for the event corresponding to the new id*/ 
    useEffect(()=>
        {eventsData.getEventById(eventId)
        .then(response => {
            console.log(response.data);
            setEvent(response.data)
        })},
        [eventId]
    )

    /* Set the event to edit on the app.js hook to the current event */
    props.editEvent(event)

    console.log(event)

    return(
        <>
        <main>
            <h1>THIS EVENT</h1>
            {/* Print out events */}
            <div className="col-lg-4 pb-1">
                <div className="card center">
                    <h1>{event.event_name}</h1>
                    <ul>
                        <li>Event Starts: {event.event_start}</li>    
                        <li>Event Ends: {event.event_end}</li>    
                        <li>Event Location: {event.event_location}</li>    
                        {/* Link to update page sending the current event as state data */}
                        <Link to={"/events/addEvent"} className = "btn btn-primary col-lg-5 mx-1 mb-1">Update</Link>
                        <Link to={"/events/delete"} className = "btn btn-primary col-lg-5 mx-1 mb-1">Delete</Link>
                    </ul>
                </div>
            </div>    
        </main>
        </>
    )
}

export default Event;
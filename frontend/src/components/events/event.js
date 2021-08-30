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
            <div className="boxContainer">
                <div className="box">
                    <h1 className = "boxBlock">{event.event_name}</h1>
                    <ul className = "boxBlock">
                        <li><strong>Event Starts:</strong> {event.event_start}</li>    
                        <li><strong>Event Ends:</strong> {event.event_end}</li>    
                        <li><strong>Event Location:</strong> {event.event_location}</li>    
                        {/* Link to update page sending the current event as state data */}
                    </ul>
                    <Link to={"/events/addEvent"} className = "boxLink">Update</Link>
                    <Link to={"/events/delete"} className = "secondaryBoxLink">Delete</Link>
                </div>
            </div>    
        </main>
        </>
    )
}

export default Event;
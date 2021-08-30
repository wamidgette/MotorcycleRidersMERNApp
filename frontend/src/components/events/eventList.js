import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react"
import eventsData from '../../controllers/eventController.js'
import image from "../../images/node.png"

function EventsList (props){
    
    const [events, setEvents] = useState([])
    
    /* function sends get request to node api method getEvents */ 
    useEffect(()=>
        {eventsData.getEvents()
        .then(response => {
            console.log(response.data);
            setEvents(response.data)
        })},
        []
    )

    props.editEvent(null);

    return(
        <>
        <main>
            <h1>Events</h1>
            {/* Link to add new event */}
            <Link to={"/events/addEvent"} className = "primaryButton">Add Event</Link>
            {/* Print out events */}
            <div className = "boxContainer">
                { console.log(events) }
                {events.map((event)=>{
                    return(
                    <div className="box">
                        <div className = "imageContainer">
                            <img src={image} alt="event image"/>
                        </div>
                        <h3 className="boxTitle">{event.event_name}</h3>
                        <p className = "boxParagraph">{event.event_start} to {event.event_end}</p>
                        <Link to={"/events/"+event._id} className = "boxLink">Details</Link>
                    </div>
                    )
                })}
            </div>
        </main>
        </>
    )
}

export default EventsList;
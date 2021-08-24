import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react"
import eventsData from '../../controllers/eventController.js'

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
            <h1>Events content</h1>
            {/* Link to add new event */}
            <Link to={"/events/addEvent"} className = "btn btn-primary col-lg-5 mx-1 mb-1">Add Event</Link>
            {/* Print out events */}
            <div className = "row">
                { console.log(events) }
                {events.map((event)=>{
                    return(
                    <div className="col-lg-4 pb-1">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">{event.event_name}</h3>
                                <p>{event.event_start} to {event.event_end}</p>
                                <Link to={"/events/"+event._id} className = "btn btn-primary col-lg-5 mx-1 mb-1">Details</Link>
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
        </main>
        </>
    )
}

export default EventsList;
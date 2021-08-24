import http from "../httpCommon";

/* Create a controller class with methods to make database requests */
class EventController {
    getEvents(){
        return http.get("/events")
    };

    getEventById(id){
        return http.get(`/events/id/${id}`)
    }

    /* Consider search method */

    createEvent(data){
        return http.post('/events', data)
    }

    updateEvent(data){
        return http.put('/events', data)
    }

    deleteEvent(eventId){
        return http.delete(`/events/${eventId}`)
    }

    /* Later -> getRidersForEvent */
}

export default new EventController()
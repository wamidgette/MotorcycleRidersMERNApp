import http from "../htmlCommon";

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

    deleteEvent(data){
        return http.delete('/events', data)
    }

    /* Later -> getRidersForEvent */
}
/* EVENTS CONTROLLER */
/* Import reference to the data access layer */
import EventsDAO from "../dao/eventsDAO.js"

export default class EventsController {

    /* GET "/events" - No parameters - this method calls the DAO method dbGetEvents to return a list of all objects in db and sets to var*/
    static async getEvents(req, res, next){
        try{
            let EventsList = await EventsDAO.dbGetEvents()
            res.json(EventsList)
        }
        catch(e){
            console.log(e.message)
            res.status(500).json({error:e.message})
        }
    }

    /* GET "/events/id/:id" - method takes parameter of id and calls the DAO to return the db object with the matching id */
    static async getEventById(req, res, next){
        try{
            let eventId = req.params.id
            let response = await EventsDAO.dbGetEventById(eventId)
            res.json(response)
        }
        catch(e){
            console.error(e.message)
            res.status(500).json({error:e.message})
        }
    }

    /* POST "/events" This method takes a JSON object and calls the DAO to add it to the database */
    static async addEvent(req, res, next){
        try{
            let eventName = req.body.event_name
            let eventStart = req.body.event_start
            let eventEnd = req.body.event_end
            let eventLocation = req.body.event_location

            /*Send to data acess layer*/
            let response = await EventsDAO.dbAddEvent( eventName, eventStart, eventEnd, eventLocation)
            res.json({status:"success"})
            console.log(response)
        }
        catch(e){
            res.status(500).json({error:e.message})
        }
    }

    /* PUT "/events" This method takes JSON object as parameter and calls DAO method dbEditEvent*/
    static async editEvent(req, res, next){
        /* User provides updated object information */
        try{
            let eventId = req.body._id
            let eventName = req.body.event_name
            let eventStart = req.body.event_start
            let eventEnd = req.body.event_end
            let eventLocation = req.body.event_location

            /* Send to data access layer */
            let response = await EventsDAO.dbEditEvent( eventId, eventName, eventStart, eventEnd, eventLocation)
            res.json({status:"success"})
            console.log(response)
        }
        /* If error, return error to client */
        catch(e){
            res.status(500).json({error:e.message})
        }
    }

    /*  DELETE "/events Method takes Id parameter and calls the DAO method dbDeleteEvent - returns success message to user" */
    static async deleteEvent(req, res, next){
        try{
            let eventId = req.body._id
            let response = await EventsDAO.dbDeleteEvent(eventId)
            /* Confirm successful delete to user */
            res.json({status : "success"})
            console.log(response)
        }
        catch(e){
            res.status(500).json({error:e.message})
        }
    }
}
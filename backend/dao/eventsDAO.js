/* Data access layer of application directly interacts with mongodb database */
import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectId

/*represents connection to the collection */
let events

export default class EventsDAO{
    /* Inject DB is the connection to the particular collection in the database */
    static async injectDB(conn){
        /* If a connection to the collection already exists, return */
        if(events){
            return
        }
        
        try{
            events = await conn.db(process.env.MOTORCYCLES_EVENTS_NS).collection("events")
        }

        catch(e){
            console.error(`Unable to connect to collection: ${e}`)
        }
    }

    /* This function does not take any parameter, it returns a full list of all of the events in the database */
    static async dbGetEvents(){
        let query = {}//empty for now while search functionality is being developed

        //Return all events matching the query
        try{
            const cursor = await events.find(query)
            const eventsList = await cursor.toArray()
            return eventsList
        }

        catch(e){ 
            console.error(e.message)
            return {}
        }
    }

    /* Takes a parameter of eventId and returns the event object from the database with the corresponding primary key */
    static async dbGetEventById(eventId){
        try{
            let id = ObjectId(eventId)
            let cursor = await events.find({"_id" : id})
            let EventArray = await cursor.toArray()
            let ThisEvent = await EventArray[0]
            console.log(ThisEvent)
            console.log()
            return ThisEvent
        }
        catch(e){
            console.error(`Error: ${e.message}`)
            return {}
        }
    }

    /* Takes parameters eventName, eventStart, eventEnd, eventLocation and adds a new object to the database */
    static async dbAddEvent(eventName, eventStart, eventEnd, eventLocation){
        try{
            /* Assign parameters to a new object */
            const Event = {
                event_name : eventName,
                event_start : eventStart,
                event_end : eventEnd,
                event_location : eventLocation,
            }
            
            /* Add this object to the database */
            return await events.insertOne(Event)
        }
        catch(e){
            console.error(`Unable to add to collection ${e}`)
            return {error : e}
        }
    }

    /* Takes parameters eventId eventName, eventStart, eventEnd, eventLocation and updates the database object with the corresponding id */
    static async dbEditEvent( eventId, eventName, eventStart, eventEnd, eventLocation ){
        try{
            const response = await events.updateOne(
                /*Where: */
                {_id:ObjectId(eventId)},
                /*Update to: */
                {$set:{ 
                    event_name : eventName,
                    event_start : eventStart,
                    event_end : eventEnd,
                    eventLocation : eventLocation
                }}
            )
            return response
        }

        catch(e){
            console.error(`Unable to edit to collection ${e}`)
            return {error : e}
        }
    }

    /* Takes parameter eventId and deletes the corresponding event object from the database */
    static async dbDeleteEvent(eventId){
        try{
            const response = await events.deleteOne({
                _id : ObjectId(eventId)
            })
            return response
        }
        catch(e){
            console.error(`Unable to delete event ${e}`)
            return {error : e}
        }
    }
}
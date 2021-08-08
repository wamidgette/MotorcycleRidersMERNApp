/* Data access layer of application directly interacts with mongodb database */
import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectId

/*represents connection to the collection */
let trips

export default class TripsDAO{
    /* Inject DB is the connection to the particular collection in the database */
    static async injectDB(conn){
        /* If a connection to the collection already exists, return */
        if(trips){
            return
        }
        
        try{
            trips = await conn.db(process.env.MOTORCYCLES_TRIPS_NS).collection("trips")
        }
        catch(e){
            console.error(`Unable to connect to collection: ${e}`)
        }
    }

    /* This function does not take any parameter, it returns a full list of all of the trips in the database */
    static async dbGetTrips(){
        let query = {}//empty for now while search functionality is being developed

        //Return all trips matching the query
        try{
            const cursor = await trips.find(query)
            const tripsList = await cursor.toArray()
            return tripsList
        }

        catch(e){
            console.error(e.message)
            return {}
        }
    }

    /* Takes a parameter of tripId and returns the trip object from the database with the corresponding primary key */
    static async dbGetTripById(tripId){
        try{
            let id = ObjectId(tripId)
            let cursor = await trips.find({"_id" : id})
            let TripArray = await cursor.toArray()
            let ThisTrip = await TripArray[0]
            console.log(ThisTrip)
            console.log()
            return ThisTrip
        }
        catch(e){
            console.error(`Error: ${e.message}`)
            return {}
        }
    }

    /* Takes parameters tripName, tripStart, tripEnd, startLocation, endLocation and adds a new object to the database */
    static async dbAddTrip(tripName, tripStart, tripEnd, startLocation, endLocation){
        try{
            /* Assign parameters to a new object */
            const Trip = {
                trip_name : tripName,
                trip_start : tripStart,
                trip_end : tripEnd,
                start_location : startLocation,
                end_location : endLocation,
            }
            
            /* Add this object to the database */
            return await trips.insertOne(Trip)
        }
        catch(e){
            console.error(`Unable to add to collection ${e}`)
            return {error : e}
        }
    }

    /* Takes parameters tripId tripName, tripStart, tripEnd, startLocation, endLocation and updates the database object with the corresponding id */
    static async dbEditTrip( tripId, tripName, tripStart, tripEnd,startLocation, endLocation ){
        try{
            const response = await trips.updateOne(
                /*Where: */
                {_id:ObjectId(tripId)},
                /*Update to: */
                {$set:{ 
                    trip_name : tripName,
                    trip_start : tripStart,
                    trip_end : tripEnd,
                    start_location : startLocation,
                    end_location : endLocation
                }}
            )
            return response
        }

        catch(e){
            console.error(`Unable to edit to collection ${e}`)
            return {error : e}
        }
    }

    /* Takes parameter tripId and deletes the corresponding trip object from the database */
    static async dbDeleteTrip(tripId){
        try{
            const response = await trips.deleteOne({
                _id : ObjectId(tripId)
            })
            return response
        }
        catch(e){
            console.error(`Unable to delete trip ${e}`)
            return {error : e}
        }
    }
}
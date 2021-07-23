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
            trips = await conn.db(process.env.TRIPS_NS).collection("trips")
        }
        catch(e){
            console.error(`Unable to connect to collection: ${e}`)
        }
    }

    static async dbGetTrips(){

    }

    static async dbAddTrips(tripName, tripStart, tripEnd, startLocation, endLocation, riderId){
        try{
            /* Assign parameters to a new object */
            const Trip = {
                trip_name : tripName,
                trip_start : tripStart,
                trip_end : tripEnd,
                start_location : startLocation,
                end_location : endLocation,
                rider_id : ObjectId(riderId)
            }
            
            /* Add this object to the database */
            return await trips.insertOne(Trip)
        }
        catch(e){
            console.error(`Unable to add to collection ${e}`)
            return {error : e}
        }
    }
}
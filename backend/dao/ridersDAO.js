/* Data access layer of application directly interacts with mongodb database */
import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectId

/*represents connection to the collection */
let riders

export default class RidersDAO{
    /* Inject DB is the connection to the particular collection in the database */
    static async injectDB(conn){
        /* If a connection to the collection already exists, return */
        if(riders){
            return
        }
        
        try{
            riders = await conn.db(process.env.MOTORCYCLES_TRIPS_NS).collection("riders")
        }

        catch(e){
            console.error(`Unable to connect to collection: ${e}`)
        }
    }

    /* This function does not take any parameter, it returns a full list of all of the riders in the database */
    static async dbGetRiders(){
        let query = {}//empty for now while search functionality is being developed

        //Return all riders matching the query
        try{
            const cursor = await riders.find(query)
            const ridersList = await cursor.toArray()
            return ridersList
        }

        catch(e){ 
            console.error(e.message)
            return {}
        }
    }

    /* Takes a parameter of riderId and returns the rider object from the database with the corresponding primary key */
    static async dbGetRiderById(riderId){
        try{
            let id = ObjectId(riderId)
            let cursor = await riders.find({"_id" : id})
            let RiderArray = await cursor.toArray()
            let ThisRider = await RiderArray[0]
            console.log(ThisRider)
            console.log()
            return ThisRider
        }
        catch(e){
            console.error(`Error: ${e.message}`)
            return {}
        }
    }

    /* Takes parameters riderName, riderStart, riderEnd, riderLocation and adds a new object to the database */
    static async dbAddRider(riderFirstName, riderLastName, riderAge, riderSex, riderPhone, riderEmail){
        try{
            /* Assign parameters to a new object */
            
            const Rider = {
                rider_fname : riderFirstName,
                rider_lname : riderLastName,
                rider_age : riderAge,
                rider_sex : riderSex,
                rider_phone: riderPhone,
                rider_email: riderEmail
            }
            
            /* Add this object to the database */
            return await riders.insertOne(Rider)
        }
        catch(e){
            console.error(`Unable to add to collection ${e}`)
            return {error : e}
        }
    }

    /* Takes parameters riderId riderName, riderStart, riderEnd, riderLocation and updates the database object with the corresponding id */
    static async dbEditRider( riderId, riderFirstName, riderLastName, riderAge, riderSex, riderPhone, riderEmail ){
        try{
            const response = await riders.updateOne(
                /*Where: */
                {_id:ObjectId(riderId)},
                /*Update to: */
                {$set:{ 
                    rider_fname : riderFirstName,
                    rider_lname : riderLastName,
                    rider_age : riderAge,
                    rider_sex : riderSex,
                    rider_phone: riderPhone,
                    rider_email: riderEmail
                }}
            )
            return response
        }

        catch(e){
            console.error(`Unable to edit to collection ${e}`)
            return {error : e}
        }
    }

    /* Takes parameter riderId and deletes the corresponding rider object from the database */
    static async dbDeleteRider(riderId){
        try{
            const response = await riders.deleteOne({
                _id : ObjectId(riderId)
            })
            return response
        }
        catch(e){
            console.error(`Unable to delete rider ${e}`)
            return {error : e}
        }
    }
}
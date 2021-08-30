/* Data access layer of application directly interacts with mongodb database */
import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectId

/*represents connection to the collection */
let motorcycles

export default class MotorcyclesDAO{
    /* Inject DB is the connection to the particular collection in the database */
    static async injectDB(conn){
        /* If a connection to the collection already exists, return */
        if(motorcycles){
            return
        }
        
        try{
            motorcycles = await conn.db(process.env.MOTORCYCLES_TRIPS_NS).collection("motorcycles")
        }

        catch(e){
            console.error(`Unable to connect to collection: ${e}`)
        }
    }

    /* This function does not take any parameter, it returns a full list of all of the motorcycles in the database */
    static async dbGetMotorcycles(){
        let query = {}//empty for now while search functionality is being developed

        //Return all motorcycles matching the query
        try{
            const cursor = await motorcycles.find(query)
            const motorcyclesList = await cursor.toArray()
            return motorcyclesList
        }

        catch(e){ 
            console.error(e.message)
            return {}
        }
    }

    /* Takes a parameter of motorcycleId and returns the motorcycle object from the database with the corresponding primary key */
    static async dbGetMotorcycleById(motorcycleId){
        try{
            let id = ObjectId(motorcycleId)
            let cursor = await motorcycles.find({"_id" : id})
            let MotorcycleArray = await cursor.toArray()
            let ThisMotorcycle = await MotorcycleArray[0]
            console.log(ThisMotorcycle)
            console.log()
            return ThisMotorcycle
        }
        catch(e){
            console.error(`Error: ${e.message}`)
            return {}
        }
    }

    /* Takes parameters motorcycleMake, motorcycleModel, motorcycleYear and adds a new object to the database */
    static async dbAddMotorcycle(motorcycleMake, motorcycleModel, motorcycleYear){
        try{
            /* Assign parameters to a new object */
            const Motorcycle = {
                motorcycle_make : motorcycleMake,
                motorcycle_model : motorcycleModel,
                motorcycle_year: motorcycleYear
            }
            
            /* Add this object to the database */
            return await motorcycles.insertOne(Motorcycle)
        }
        catch(e){
            console.error(`Unable to add to collection ${e}`)
            return {error : e}
        }
    }

    /* Takes parameters motorcycleId, motorcycleMake, motorcycleModel, motorcycleYear and updates the database object with the corresponding id */
    static async dbEditMotorcycle( motorcycleId, motorcycleMake, motorcycleModel, motorcycleYear ){
        try{
            const response = await motorcycles.updateOne(
                /*Where: */
                {_id:ObjectId(motorcycleId)},
                /*Update to: */
                {$set:{ 
                    motorcycle_make : motorcycleMake,
                    motorcycle_model : motorcycleModel,
                    motorcycle_year: motorcycleYear
                }}
            )
            return response
        }

        catch(e){
            console.error(`Unable to edit to collection ${e}`)
            return {error : e}
        }
    }

    /* Takes parameter motorcycleId and deletes the corresponding motorcycle object from the database */
    static async dbDeleteMotorcycle(motorcycleId){
        try{
            const response = await motorcycles.deleteOne({
                _id : ObjectId(motorcycleId)
            })
            return response
        }
        catch(e){
            console.error(`Unable to delete motorcycle ${e}`)
            return {error : e}
        }
    }
}
/* TRIPS CONTROLLER */
/* Import reference to the data access layer */
import TripsDAO from "../dao/tripsDAO.js"

export default class TripsController {

    /* GET "/trips" - No parameters - this method calls the DAO method dbGetTrips to return a list of all objects in db and sets to var*/
    static async getTrips(req, res, next){
        try{
            let TripsList = await TripsDAO.dbGetTrips()
            res.json(TripsList)
        }
        catch(e){
            console.log(e.message)
            res.status(500).json({error:e.message})
        }
    }

    /* GET "/trips/id/:id" - method takes parameter of id and calls the DAO to return the db object with the matching id */
    static async getTripById(req, res, next){
        try{
            let tripId = req.params.id
            let response = await TripsDAO.dbGetTripById(tripId)
            res.json(response)
        }
        catch(e){
            console.error(e.message)
            res.status(500).json({error:e.message})
        }
    }

    /* POST "/trips" This method takes a JSON object and calls the DAO to add it to the database */
    static async addTrip(req, res, next){
        try{
            let tripName = req.body.trip_name
            let tripStart = req.body.trip_start
            let tripEnd = req.body.trip_end
            let startLocation = req.body.start_location
            let endLocation = req.body.end_location

            /*Send to data acess layer*/
            let response = await TripsDAO.dbAddTrip( tripName, tripStart, tripEnd,startLocation, endLocation )
            res.json({status:"success"})
            console.log(response)
        }
        catch(e){
            res.status(500).json({error:e.message})
        }
    }

    /* PUT "/trips" This method takes JSON object as parameter and calls DAO method dbEditTrip*/
    static async editTrip(req, res, next){
        /* User provides updated object information */
        try{
            let tripId = req.body._id
            let tripName = req.body.trip_name
            let tripStart = req.body.trip_start
            let tripEnd = req.body.trip_end
            let startLocation = req.body.start_location
            let endLocation = req.body.end_location

            /* Send to data access layer */
            let response = await TripsDAO.dbEditTrip( tripId, tripName, tripStart, tripEnd,startLocation, endLocation )
            res.json({status:"success"})
            console.log(response)
        }
        /* If error, return error to client */
        catch(e){
            res.status(500).json({error:e.message})
        }
    }

    /*  DELETE "/trips Method takes Id parameter and calls the DAO method dbDeleteTrip - returns success message to user" */
    static async deleteTrip(req, res, next){
        try{

            let tripId = req.params.id
            let response = await TripsDAO.dbDeleteTrip(tripId)
            /* Confirm successful delete to user */
            res.json({status : "success"})
            console.log(response)
        }
        catch(e){
            res.status(500).json({error:e.message})
        }
    }
/*    To come...
    static async editTrip(req, res, next){};
    static async deleteTrip(req, res, next){}; */

}
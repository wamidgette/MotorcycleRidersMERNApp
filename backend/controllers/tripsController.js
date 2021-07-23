/* TRIPS CONTROLLER */
/* Import reference to the data access layer */
import TripsDAO from "../dao/tripsDAO.js"

export default class TripsController {
    static async getTrips(req, res, next){
        try{
            const tripsList = await TripsDAO.dbGetTrips
            let response = {
                trips : tripsList
            }
            res.json(response)
        }
        catch(e){
            console.log(e.message)
            res.status(500).json({error:e.message})
        }
    }

    /* This method takes a JSON object and calls the DAO to add it to the database */
    static async addTrip(req, res, next){
        try{
            const tripName = req.body.trip_name
            const tripStart = req.body.trip_start
            const tripEnd = req.body.trip_end
            const startLocation = req.body.start_location
            const endLocation = req.body.end_location
            const riderId = req.body.rider.rider_id

            /*Send to data acess layer*/
            const response = await TripsDAO.dbAddTrips( tripName, tripStart, tripEnd,startLocation, endLocation, riderId )
            res.json({status:"success"})
            console.log(response)
        }
        catch(e){
            res.status(500).json({error:e.message})
        }
    }
/*     static async getTripById(req, res, next){};
    static async addTrip(req, res, next){};
    static async editTrip(req, res, next){};
    static async deleteTrip(req, res, next){}; */



}
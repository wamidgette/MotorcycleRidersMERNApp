/* RIDERS CONTROLLER */
/* Import reference to the data access layer */
import RidersDAO from "../dao/ridersDAO.js"

export default class RidersController {

    /* GET "/riders" - No parameters - this method calls the DAO method dbGetRiders to return a list of all objects in db and sets to var*/
    static async getRiders(req, res, next){
        try{
            let RidersList = await RidersDAO.dbGetRiders()
            res.json(RidersList)
        }
        catch(e){
            console.log(e.message)
            res.status(500).json({error:e.message})
        }
    }

    /* GET "/riders/id/:id" - method takes parameter of id and calls the DAO to return the db object with the matching id */
    static async getRiderById(req, res, next){
        try{
            let riderId = req.params.id
            let response = await RidersDAO.dbGetRiderById(riderId)
            res.json(response)
        }
        catch(e){
            console.error(e.message)
            res.status(500).json({error:e.message})
        }
    }

    /* POST "/riders" This method takes a JSON object and calls the DAO to add it to the database */
    static async addRider(req, res, next){
        try{
            let riderFirstName = req.body.rider_fname
            let riderLastName = req.body.rider_lname
            let riderAge = req.body.rider_age
            let riderSex = req.body.rider_sex
            let riderPhone = req.body.rider_phone
            let riderEmail = req.body.rider_email

            /*Send to data acess layer*/
            let response = await RidersDAO.dbAddRider( riderFirstName, riderLastName, riderAge, riderSex, riderPhone, riderEmail)
            res.json({status:"success"})
            console.log(response)
        }
        catch(e){
            res.status(500).json({error:e.message})
        }
    }

    /* PUT "/riders" This method takes JSON object as parameter and calls DAO method dbEditRider*/
    static async editRider(req, res, next){
        /* User provides updated object information */
        try{
            let riderId = req.body._id
            let riderFirstName = req.body.rider_fname
            let riderLastName = req.body.rider_lname
            let riderAge = req.body.rider_age
            let riderSex = req.body.rider_sex
            let riderPhone = req.body.rider_phone
            let riderEmail = req.body.rider_email

            /* Send to data access layer */
            let response = await RidersDAO.dbEditRider( riderId, riderFirstName, riderLastName, riderAge, riderSex, riderPhone, riderEmail)
            res.json({status:"success"})
            console.log(response)
        }
        /* If error, return error to client */
        catch(e){
            res.status(500).json({error:e.message})
        }
    }

    /*  DELETE "/riders Method takes Id parameter and calls the DAO method dbDeleteRider - returns success message to user" */
    static async deleteRider(req, res, next){
        try{
            let riderId = req.params.id
            let response = await RidersDAO.dbDeleteRider(riderId)
            /* Confirm successful delete to user */
            res.json({status : "success"})
            console.log(response)
        }
        catch(e){
            res.status(500).json({error:e.message})
        }
    }
}
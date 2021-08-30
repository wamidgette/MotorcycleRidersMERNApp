/* MotorcycleS CONTROLLER */
/* Import reference to the data access layer */
import MotorcyclesDAO from "../dao/motorcyclesDAO.js"

export default class MotorcyclesController {

    /* GET "/motorcycles" - No parameters - this method calls the DAO method dbGetmotorcycles to return a list of all objects in db and sets to var*/
    static async getMotorcycles(req, res, next){
        try{
            let MotorcyclesList = await MotorcyclesDAO.dbGetMotorcycles()
            res.json(MotorcyclesList)
        }
        catch(e){
            console.log(e.message)
            res.status(500).json({error:e.message})
        }
    }

    /* GET "/motorcycles/id/:id" - method takes parameter of id and calls the DAO to return the db object with the matching id */
    static async getMotorcycleById(req, res, next){
        try{
            let motorcycleId = req.params.id
            let response = await MotorcyclesDAO.dbGetMotorcycleById(motorcycleId)
            res.json(response)
        }
        catch(e){
            console.error(e.message)
            res.status(500).json({error:e.message})
        }
    }

    /* POST "/motorcycles" This method takes a JSON object and calls the DAO to add it to the database */
    static async addMotorcycle(req, res, next){
        try{
            let motorcycleMake = req.body.motorcycle_make
            let motorcycleModel = req.body.motorcycle_model
            let motorcycleYear = req.body.motorcycle_year
            
            /*Send to data acess layer*/
            let response = await MotorcyclesDAO.dbAddMotorcycle( motorcycleMake, motorcycleModel, motorcycleYear)
            res.json({status:"success"})
            console.log(response)
        }
        catch(e){
            res.status(500).json({error:e.message})
        }
    }

    /* PUT "/motorcycles" This method takes JSON object as parameter and calls DAO method dbEditmotorcycle*/
    static async editMotorcycle(req, res, next){
        /* User provides updated object information */
        try{
            let motorcycleId = req.body._id
            let motorcycleMake = req.body.motorcycle_make
            let motorcycleModel = req.body.motorcycle_model
            let motorcycleYear = req.body.motorcycle_year

            /* Send to data access layer */
            let response = await MotorcyclesDAO.dbEditMotorcycle( motorcycleId, motorcycleMake, motorcycleModel, motorcycleYear)
            res.json({status:"success"})
            console.log(response)
        }
        /* If error, return error to client */
        catch(e){
            res.status(500).json({error:e.message})
        }
    }

    /*  DELETE "/motorcycles Method takes Id parameter and calls the DAO method dbDeleteMotorcycle - returns success message to user" */
    static async deleteMotorcycle(req, res, next){
        try{
            let motorcycleId = req.params.id
            let response = await MotorcyclesDAO.dbDeleteMotorcycle(motorcycleId)
            /* Confirm successful delete to user */
            res.json({status : "success"})
            console.log(response)
        }
        catch(e){
            res.status(500).json({error:e.message})
        }
    }
}
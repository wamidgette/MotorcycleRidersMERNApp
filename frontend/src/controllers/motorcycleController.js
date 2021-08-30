import http from "../httpCommon";

/* Create a controller class with methods to make database requests */
class MotorcycleController {
    getMotorcycles(){
        return http.get("/motorcycles")
    };

    getMotorcycleById(id){
        return http.get(`/motorcycles/id/${id}`)
    }

    /* Consider search method */

    createMotorcycle(data){
        return http.post('/motorcycles', data)
    }

    updateMotorcycle(data){
        return http.put('/motorcycles', data)
    }

    deleteMotorcycle(motorcycleId){
        return http.delete(`/motorcycles/${motorcycleId}`)
    }
}

export default new MotorcycleController()
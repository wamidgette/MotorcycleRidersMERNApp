import http from "../httpCommon";

/* Create a controller class with methods to make database requests */
class RiderController {
    getRiders(){
        return http.get("/riders")
    };

    getRiderById(id){
        return http.get(`/riders/id/${id}`)
    }

    /* Consider search method */

    createRider(data){
        return http.post('/riders', data)
    }

    updateRider(data){
        return http.put('/riders', data)
    }

    deleteRider(riderId){
        return http.delete(`/riders/${riderId}`)
    }

    /* Later -> getRidersForEvent */
}

export default new RiderController()
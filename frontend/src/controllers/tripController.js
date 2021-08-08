import http from "../httpCommon"

class TripController{
    getAll(){
        return http.get("/trips");
    }

    getById(id){
        return http.get(`/trips/id/${id}`);
    }

    add(data){
        return http.post("/trips", data)
    }

    edit(data){
        return http.put("/trips", data)
    }

    delete(data){
        return http.delete("/trips", data)
    }
}

export default new TripController()
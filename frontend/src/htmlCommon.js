/* This is the base url for requests to the Node server. All database requests will be extensions of this url */
import axios from "axios";

export default axios.create({
    baseURL:"http://localhost:5000/",
    headers: {
        "Content-type":"application/json"
    }
});
import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react"
import ridersData from '../../controllers/riderController.js'

const DeleteRider = props => {

    /* Initial - set edit to falsey and rider to empty string */
    let rider = props.rider
    console.log(rider)
    const [submitted, setSubmitted] = useState(false) 

    /* Initial rider properties */
    const riderId = rider._id
    console.log(rider._id)
    const riderName = rider.rider_name
    const riderStart = rider.rider_start
    const riderEnd = rider.rider_end
    const startLocation = rider.start_location
    const endLocation = rider.end_location
    
    /* If not, edit = false and keep object empty as initial */
    
    /* Define functions for adding and updating a rider */
    const deleteRider  = () => {
        alert("delete rider triggered")

        /* Can have validation here later - return false if any errors*/

        /* Delete the rider */
        ridersData.deleteRider (riderId).then(
            response => {
                setSubmitted(true);
                console.log(response.data);
        }).catch(e => {
            console.log(e)
        });
    };

    /* Render the object properties in a form for client*/
    return(
    <>
        <main>
            {/* If edit = true title is Edit rider, else it is add rider */}
            {rider? (<h1>Delete This rider?</h1>) : (<h1>No rider Selected</h1>)}
            {/* Form submitted? */}
            {submitted? (
                <h3>rider has been deleted</h3>
            ) : (/* else, render form for user to update/add based on object properties */
                <div className="row">                    
                <div className="col-lg-4 pb-1">
                    <div className="card ">
                        <div className="card-body">
                            {/* If editing, object id will already be set, else do not include */}
                            {rider? (
                                <div>
                                    <input hidden value = {riderId}></input>
                                    <h3>{riderName}</h3>
                                    <button onClick={deleteRider} className="btn btn-success">Delete rider</button>
                                    <Link to="/riders">Back to riders</Link>
                                </div>) : (
                                <div>
                                    <div>No rider has been selected</div>
                                    <Link to="/rider">Back to riders List</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                </div>    
            )}
            
        </main>
    </>
    )
}

export default DeleteRider;
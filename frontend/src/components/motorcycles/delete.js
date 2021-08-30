import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react"
import motorcyclesData from '../../controllers/motorcycleController.js'

const DeleteMotorcycle = props => {

    /* Initial - set edit to falsey and motorcycle to empty string */
    let motorcycle = props.motorcycle
    console.log(motorcycle)
    const [submitted, setSubmitted] = useState(false) 

    /* Initial motorcycle properties */
    const motorcycleId = motorcycle._id
    console.log(motorcycle._id)
    const motorcycleMake= motorcycle.motorcycle_make
    const motorcycleModel = motorcycle.motorcycle_model
    const motorcycleYear = motorcycle.motorcycle_year

    
    /* If not, edit = false and keep object empty as initial */
    
    /* Define functions for adding and updating a motorcycle */
    const deleteMotorcycle = () => {
        alert("delete motorcycle triggered")

        /* Can have validation here later - return false if any errors*/

        /* Delete the motorcycle */
        motorcyclesData.deleteMotorcycle(motorcycleId).then(
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
            {/* If edit = true title is Edit motorcycle, else it is add motorcycle */}
            {motorcycle? (<h1>Delete This Motorcycle?</h1>) : (<h1>No Motorcycle Selected</h1>)}
            {/* Form submitted? */}
            {submitted? (
                <h3>Motorcycle has been deleted</h3>
            ) : (/* else, render form for user to update/add based on object properties */
                <div className="boxContainer">                    
                    <div className="box">
                        {/* If editing, object id will already be set, else do not include */}
                        {motorcycle? (
                            <div>
                                <input hidden value = {motorcycleId}></input>
                                <h3>{motorcycleMake} {motorcycleModel}, {motorcycleYear}</h3>
                                <button onClick={deleteMotorcycle} className="secondaryBoxLink">Delete Motorcycle</button>
                                <Link className="boxLink" to="/motorcycles">Back to Motorcycles</Link>
                            </div>) : (
                            <div>
                                <div>No motorcycle has been selected</div>
                                <Link to="/motorcycle">Back to Motorcycles List</Link>
                            </div>
                        )}
                    </div>
                </div>    
            )}
            
        </main>
    </>
    )
}

export default DeleteMotorcycle;
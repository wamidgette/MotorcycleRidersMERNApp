import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react"
import motorcyclesData from '../../controllers/motorcycleController.js'

const AddMotorcycle = props => {

    /* Initial - set edit to falsey and trip to empty string */
    let edit
    let motorcycle = ""
    /* Track if form has been submitted with binary value */
    const [submitted, setSubmitted] = useState(false) 

    /* Set edit = true if object passed and update initial object to the object passed */
    if(props.motorcycle !== null){
        edit = true
        motorcycle = props.motorcycle
    }

    /* Initial motorcycle properties */
    const [motorcycleId, setMotorcycleId] = useState(motorcycle._id)
    const [motorcycleMake, setMotorcycleMake] = useState(motorcycle.motorcycle_make)
    const [motorcycleModel, setMotorcycleModel] = useState(motorcycle.motorcycle_model)
    const [motorcycleYear, setMotorcycleYear] = useState(motorcycle.motorcycle_year)

    /* Define function for adding and updating a motorcycle */
    const saveMotorcycle = () => {
        alert("add motorcycle triggered")

        /* Can have validation here later - return false if any errors*/
        let data = {
            motorcycle_make : motorcycleMake,
            motorcycle_model : motorcycleModel,
            motorcycle_year : motorcycleYear,
        }

        /* If user is editing, add the motorcycleId to the data and call the edit/update method */
        if(edit){
            data._id = motorcycleId
            console.log(data)
            motorcyclesData.updateMotorcycle(data).then(
                response => {
                    setSubmitted(true);
                    console.log(response.data);
            }).catch(e => {
                console.log(e)
            });
        }

        /* If user is not editing call the add method */
        else{
            console.log(data)
            motorcyclesData.createMotorcycle(data).then(
                response => {
                    setSubmitted(true);
                    console.log(response.data);
            }).catch(e => {
                console.log(e)
            });
        }
    };

    /* Functions to update the current motorcycle object as user makes changes to input fields */
    const makeValueChange = e => {
        setMotorcycleMake(e.target.value);
    };
    const modelValueChange = e => {
        setMotorcycleModel(e.target.value);
    };
    const yearValueChange = e => {
        setMotorcycleYear(e.target.value);
    };

    /* Generate dropdown for motorcycle year options */
    let motorycleYearOptions = []
    let year = new Date().getFullYear()
    for (let i=1900; i<=year; i++){
        motorycleYearOptions.unshift(i)
    }
 
    /* Render the object properties in a form for client*/
    return(
        <>
            <main>
                {/* If edit = true title is Edit motorcycle, else it is add motorcycle */}
                {edit? (<h1>Update Motorcycle</h1>) : (<h1>Add Motorcycle</h1>)}
                {/* Form submitted? */}
                {submitted? (
                    <>
                        <h3>Motorcycle has been submitted</h3>
                        <Link to="/motorcycles">Back to motorcycles</Link>
                    </>
                ) : (/* else, render form for user to update/add based on object properties */
                    <div className="boxContainer">
                        <div className="box">
                            {/* If editing, object id will already be set, else do not include */}
                            {edit? (
                                <>
                                <h3 className = "boxTitle">Update this bike</h3>
                                <div>
                                    <input hidden value = {motorcycleId}></input>
                                </div>
                                </>) : (
                                <h3 className = "boxBlock">Add A Motorcycle</h3>

                            )}
                            <div className = "boxBlock">
                                {/* Later to be a dropdown list of makes */}
                                <label htmlFor="">Make: </label>
                                <input type="text" onChange={makeValueChange} value = {motorcycleMake}></input>
                            </div>
                            <div className = "boxBlock">
                                {/* Later to be a dropdown list of models */}
                                <label htmlFor="">Model: </label>
                                <input type="text" onChange={modelValueChange} value = {motorcycleModel}></input>
                            </div>
                            <div className = "boxBlock">
                                <label htmlFor="">Year: </label>
                                <select onChange={yearValueChange} value = {motorcycleYear}>
                                    {motorycleYearOptions.map(i => (
                                        <option value = {i}>{i}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Edit? Show an update button that calls the update function and update db method. If not, show an add button that calls the add function db method */}
                            {edit? (<button onClick={saveMotorcycle} className="boxLink">Update Motorcycle</button>) : (<button onClick={saveMotorcycle} className="boxLink">Add Motorcycle</button>)}
                        </div>
                    </div>    
                )}
            </main>
        </>
    )
}

export default AddMotorcycle;
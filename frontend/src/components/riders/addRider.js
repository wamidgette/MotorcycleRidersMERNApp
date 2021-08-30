import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react"
import ridersData from '../../controllers/riderController'

const AddRider = props => {

    /* Initial - set edit to falsey and trip to empty string */
    let edit
    let rider = ""
    /* Track if form has been submitted with binary value */
    const [submitted, setSubmitted] = useState(false) 

    /* Set edit = true if object passed and update initial object to the object passed */
    if(props.rider !== null){
        edit = true
        rider = props.rider
    }

    /* Initial rider properties */
    const [riderId, setRiderId] = useState(rider._id)
    const [riderFname, setRiderFname] = useState(rider.rider_fname)
    const [riderLname, setRiderLname] = useState(rider.rider_lname)
    const [riderAge, setRiderAge] = useState(rider.rider_age)
    const [riderSex, setRiderSex] = useState(rider.rider_sex)
    const [riderPhone, setRiderPhone] = useState(rider.rider_phone)
    const [riderEmail, setRiderEmail] = useState(rider.rider_email)

    /* Define function for adding and updating a rider */
    const saveRider = () => {
        alert("add rider triggered")

        /* Can have validation here later - return false if any errors*/
        let data = {
            rider_fname: riderFname,
            rider_lname: riderLname,
            rider_age : riderAge,
            rider_sex : riderSex,
            rider_phone : riderPhone,
            rider_email : riderEmail
        }

        /* If user is editing, add the riderId to the data and call the edit/update method */
        if(edit){
            data._id = riderId
            console.log(data)
            ridersData.updateRider(data).then(
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
            ridersData.createRider(data).then(
                response => {
                    setSubmitted(true);
                    console.log(response.data);
            }).catch(e => {
                console.log(e)
            });
        }
    };

    /* Functions to update the current rider object as user makes changes to input fields */
    const fnameValueChange = e => {
        setRiderFname(e.target.value);
    };
    const lnameValueChange = e => {
        setRiderLname(e.target.value);
    };
    const ageChange = e => {
        setRiderAge(e.target.value);
    };
    const sexChange = e => {
        setRiderSex(e.target.value);
    };
    const phoneChange = e => {
        setRiderPhone(e.target.value);
    };
    const emailChange = e => {
        setRiderEmail(e.target.value);
    };


    /* Render the object properties in a form for client*/
    return(
        <>
            <main>
                {/* If edit = true title is Edit rider, else it is add rider */}
                {edit? (<h1>Update rider</h1>) : (<h1>Add rider</h1>)}
                {/* Form submitted? */}
                {submitted? (
                    <h3>rider has been submitted</h3>
                ) : (/* else, render form for user to update/add based on object properties */
                    <div className="boxContainer">                    
                        <div className="box">
                            {/* If editing, object id will already be set, else do not include */}
                            {edit? (
                                <>
                                    <h3 className = "boxTitle">Update This Rider</h3>
                                    <input hidden value = {riderId}></input>
                                </>) : (
                                    <h3 className = "boxTitle">Add a Rider</h3>
                            )}
                            <div className = "boxBlock">
                                <label>First Name: </label>
                                <input type="text" onChange={fnameValueChange} value = {riderFname}></input>
                            </div>
                            <div className = "boxBlock">
                                <label>Last Name: </label>
                                <input type="text" onChange={lnameValueChange} value = {riderLname}></input>
                            </div>
                            <div className = "boxBlock">
                                <label>Age: </label>
                                <input type="number" onChange={ageChange} value = {riderAge}></input>
                            </div>
                            <div className = "boxBlock">
                                <label>Sex: </label>
                                <select type="option" onChange={sexChange} value = {riderSex}>
                                    <option selected = "selected" value = "Male" >Male</option>
                                    <option value = "Female">Female</option>
                                </select>
                            </div>
                            <div className = "boxBlock">
                                <label htmlFor="">Phone: </label>
                                <input type="text" onChange={phoneChange} value = {riderPhone}></input>
                            </div>
                            <div className = "boxBlock">
                                <label htmlFor="">Email: </label>
                                <input type="email" onChange={emailChange} value = {riderEmail}></input>
                            </div>
                            {/* Edit? Show an update button that calls the update function and update db method. If not, show an add button that calls the add function db method */}
                            {edit? (<button onClick={saveRider} className="boxLink">Update rider</button>) : (<button onClick={saveRider} className="boxLink">Add Rider</button>)}
                    </div>
                    </div>
                )}
            </main>
        </>
    )
}

export default AddRider;
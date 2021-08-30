import {Link, useParams} from 'react-router-dom';
import React,{useState, useEffect} from "react"
import ridersData from '../../controllers/riderController.js'

function Rider (props){
    /* Initial rider value */
    const initialRider = {
        _id : null,
        rider_fname: "",
        rider_lname: "",
        rider_age : "",
        rider_sex : "",
        rider_phone : "",
        rider_email : ""
      };
    
      /* Usestate for rider object */
    const [rider, setRider] = useState(initialRider)

    /* Get the rider id from the url */
    let riderId = window.location.pathname.split("/")[2]

    /* If the riderId value changes, send request to database for the rider corresponding to the new id*/ 
    useEffect(()=>
        {ridersData.getRiderById(riderId)
        .then(response => {
            console.log(response.data);
            setRider(response.data)
        })},
        [riderId]
    )

    /* Set the rider to edit on the app.js hook to the current rider */
    props.editRider(rider)

    console.log(rider)

    return(
        <>
        <main>
            <h1>THIS Rider</h1>
            {/* Print out riders */}
            <div className="boxContainer">
                <div className="box">
                    <h2 className = "boxBlock">{rider.rider_fname} {rider.rider_lname}</h2>
                    <ul className = "boxBlock">
                        <li><strong>Rider First Name:</strong> {rider.rider_fname}</li>    
                        <li><strong>Rider Ends:</strong> {rider.rider_lname}</li>    
                        <li><strong>Rider Age:</strong> {rider.rider_age}</li>    
                        <li><strong>Rider Sex:</strong> {rider.rider_sex}</li>    
                        <li><strong>Rider Phone:</strong> {rider.rider_phone}</li>    
                        <li><strong>Rider Location:</strong> {rider.rider_email}</li>    
                    </ul>
                    {/* Link to update page sending the current rider as state data */}
                    <Link to={"/riders/addRider"} className = "boxLink">Update</Link>
                    <Link to={"/riders/delete"} className = "secondaryBoxLink">Delete</Link>
                </div>
            </div>    
        </main>
        </>
    )
}

export default Rider;
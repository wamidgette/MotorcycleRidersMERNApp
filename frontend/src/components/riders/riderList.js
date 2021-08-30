import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react"
import ridersData from '../../controllers/riderController.js'
import image from "../../images/node.png"

function RidersList (props){
    
    const [riders, setRiders] = useState([])
    
    /* function sends get request to node api method getriders */ 
    useEffect(()=>
        {ridersData.getRiders()
        .then(response => {
            console.log(response.data);
            setRiders(response.data)
        })},
        []
    )

    props.editRider(null);

    return(
        <>
        <main>
            <h1>Riders</h1>
            {/* Link to add new rider */}
            <Link to={"/riders/addRider"} className = "primaryButton">Add rider</Link>
            {/* Print out riders */}
            <div className = "boxContainer">
                { console.log(riders) }
                {riders.map((rider)=>{
                    return(
                    <div className="box">
                        <div className = "imageContainer">
                            <img src={image} alt="rider image"/>
                        </div>
                            <h3 className="boxTitle">{rider.rider_fname} {rider.rider_lname}</h3>
                            <p className = "boxParagraph">Age: {rider.rider_age}</p>
                            <p className = "boxParagraph">Sex: {rider.rider_sex}</p>
                            <Link to={"/riders/"+rider._id} className = "boxLink">Details</Link>
                    </div>
                    )
                })}
            </div>
        </main>
        </>
    )
}

export default RidersList;
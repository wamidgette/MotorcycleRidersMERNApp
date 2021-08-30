import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react"
import motorcyclesData from '../../controllers/motorcycleController.js'
import image from "../../images/node.png"

function MotorcyclesList (props){
    
    const [motorcycles, setMotorcycles] = useState([])
    
    /* function sends get request to node api method getMotorcycles */ 
    useEffect(()=>
        {motorcyclesData.getMotorcycles()
        .then(response => {
            console.log(response.data);
            setMotorcycles(response.data)
        })},
        []
    )

    props.editMotorcycle(null);

    return(
        <>
        <main>
            <h1>Motorcycles</h1>
            {/* Link to add new motorcycle */}
            <Link to={"/motorcycles/addMotorcycle"} className = "primaryButton">Add Motorcycle</Link>
            {/* Print out motorcycles */}
            <div className = "boxContainer">
                { console.log(motorcycles) }
                {motorcycles.map((motorcycle)=>{
                    return(
                    <div className="box">
                        <div className = "imageContainer">
                            <img src={image} alt="motorcycle image"/>
                        </div>
                        <h3 className="boxTitle">{motorcycle.motorcycle_make} {motorcycle.motorcycle_model} {motorcycle.motorcycle_year}</h3>
                        <Link to={"/motorcycles/"+motorcycle._id} className = "boxLink">Details</Link>
                    </div>
                    )
                })}
            </div>
        </main>
        </>
    )
}

export default MotorcyclesList;
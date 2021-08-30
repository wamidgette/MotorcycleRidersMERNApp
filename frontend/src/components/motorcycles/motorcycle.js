import {Link, useParams} from 'react-router-dom';
import React,{useState, useEffect} from "react"
import motorcyclesData from '../../controllers/motorcycleController.js'

function Motorcycle (props){
    /* Initial motorcycle value */
    const initialMotorcycle = {
        _id : null,
        motorcycle_make: "",
        motorcycle_model: "",
        motorcycle_year : "",
      };
    
      /* Usestate for motorcycle object */
    const [motorcycle, setMotorcycle] = useState(initialMotorcycle)

    /* Get the motorcycle id from the url */
    let motorcycleId = window.location.pathname.split("/")[2]

    /* If the motorcycleId value changes, send request to database for the motorcycle corresponding to the new id*/ 
    useEffect(()=>
        {motorcyclesData.getMotorcycleById(motorcycleId)
        .then(response => {
            console.log(response.data);
            setMotorcycle(response.data)
        })},
        [motorcycleId]
    )

    /* Set the motorcycle to edit on the app.js hook to the current motorcycle */
    props.editMotorcycle(motorcycle)

    console.log(motorcycle)

    return(
        <>
        <main>
            <h1>Motorcycle Details</h1>
            {/* Print out motorcycles */}
            <div className="box-container">
                <div className="box">
                    <h2 className = "boxBlock">{motorcycle.motorcycle_make} {motorcycle.motorcycle_model}</h2>
                    <ul className = "boxBlock">
                        <li>Make: {motorcycle.motorcycle_make}</li>
                        <li>Model: {motorcycle.motorcycle_model}</li>
                        <li>Year: {motorcycle.motorcycle_year}</li>
                    </ul>
                    {/* Link to update page sending the current motorcycle as state data */}
                    <Link to={"/motorcycles/addMotorcycle"} className = "boxLink">Update</Link>
                    <Link to={"/motorcycles/delete"} className = "secondaryBoxLink">Delete</Link>
                </div>
            </div>    
        </main>
        </>
    )
}

export default Motorcycle;
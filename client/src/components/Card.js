import React from "react";

import './styles/Card.css'

export default function Card ({image ,id, name , temperament , weight}){

    return(

        <div className="format" >
            <img className="image" src={image} alt='' />
            <br></br>
            
            <h4 className="name">Nombre: {name}</h4> 
            <br></br>
            <h4>Temperamento: {temperament}</h4>
            <br></br>
            <h4>Peso Kg min-max: {weight}</h4>
            
            
            
        </div>
        
    )




}
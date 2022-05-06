import React from 'react';
import { Link } from 'react-router-dom';
import './styles/landinpage.css';


export default function LandingPage(){

    return (
            <div >
                <h2 > Bienvenidos a  DOGS </h2>
                <br></br>
                      <p>Info  de razas de perros </p>
                      <br></br>
                      <div >
                          <Link to ='/home'>
                          <button > Pagina Principal </button> 
                          </Link>
                          
                      </div>
                      <br></br>
                  <h5>by Daniel Perco</h5>
            </div>

        
    );
         
};
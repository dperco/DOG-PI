import React from 'react';
import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { getNameDog} from '../actions';


export default function SearchBar(){

      const dispatch=useDispatch();
      const [name,setName]= useState('');

      function handleInputChange(e){
          e.preventDefault();
          setName(e.target.value)
          console.log(name)
      };
      function handleSubmit(e) {
        e.preventDefault();
        if (name !== ""){
          console.log (name, "BUSCAR");
          dispatch(getNameDog(name));
          setName("");
        } else {
          alert("Ingrese un nombre correcto");
      };
    };

      // function handleSubmit(e){
      //   e.preventDefault();
      //   if(name){
      //   dispatch(getNameDog(name));
      //   }else{
      //     return alert('no existe el perro ');
      //   }
      // };

      return(
        <div> 
            
               {/* <input type='search'placeholder='Buscar...' onChange={(e)=> handleInputChange(e)}/>

               <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button> */}
               <div>
        <input type = 'text' value ={name.name} placeholder = 'Buscar dog' onChange= {(e)=> handleInputChange(e)}/>
        <button  type = 'submit' onClick = {(e)=> handleSubmit(e)}>Buscar</button>
    </div>
             
        </div>
      )

}


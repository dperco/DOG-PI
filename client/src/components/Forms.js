import React from "react";
import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import {postDogs,getForm} from '../actions/index';
import { useDispatch,useSelector } from 'react-redux';
 import './styles/form.css';

 function validate (input){
   
    let a=Boolean
    a=true;
   
    
    
     
     if(input.name.length < 3  || !isNaN(input.name)){
         alert('nombre erroneo  deben ser mas de 3 letras');
        a=false;
     }
     
    if ( input.weight  < 0){
        alert('peso erroneo');
         a=false;             
    }
    
                
    if (input.height < 0 ){
        alert('altura erronea <br>');
        a=false;  
    }
                  
    if(input.life < 0){
            alert('edad erronea  ');
            a=false;                    
    }  
    
    if(!input.image){
        alert('cargar imagen');
        
    }
    
    if(!input.temperament){
         alert('ingrese temperamento para crear raza');
         
     
    };
    
    if(a ){
        alert('raza creada');
        return true
    }else{
        alert('error en la carga de datos')
        return false
    }
    
    
       
};
    
    
    
 


export default function Forms(){
const dispatch= useDispatch(); 
const tempSeleccionados=useSelector((state => state.temperam));
const [,setError]= useState({});
const [input ,setInput]=useState({
            
            name:"",
            weight:"",
            height:"",
            life:"",
            image:"",
            temperament:[]
});

useEffect(()=>{
  dispatch(getForm());
},[dispatch]);

function handleChange(e){
    e.preventDefault();
            setInput ({
                ...input,
                [e.target.name]: e.target.value
            });
         
};
 function handleSelect (e){
     e.preventDefault();
     if(!input.temperament.includes(e.target.value)){
        setInput ({
            ...input,
            temperament:
            [...input.temperament,e.target.value]
        });
      if(input.temperament.length > 4){
         setError('cantidad temp excesiva')
      }
    }   
};
   
function handleDelete(e){
    var finded= input.temperament.findIndex(el => el === e.target.name)
    setInput(
        input.temperament.filter((el,index) => index !== finded)
         //...input,
         //temperament: input.temperament.filter(elem => elem !== e)
    );
    if(input.temperament.length <=6 ){
        setError("")
    }
};

function handleSubmit (e){
    e.preventDefault();
    setError(validate({
        ...input,
        [e.target.value]:e.target.value
     }));
     
 if (validate(input)){
     dispatch(postDogs(input));
    }else{
        return alert('error 404 en los datos');
    }
    
    
      setInput({
         id:"",
         name:"",
         weight:"",
         height:"",
         life:"",
         image:"",
         temperament:[]
      })};
      
         
   return(

       <div className="form">
            <Link to='/home'><button>Volver</button></Link>

            <h1>Crear  nueva Raza de Perros </h1>

            <form action="editor.cgi"  method="POST" className="formato"  >
            
                
                <div>
                    <label className="TEXT"> Nombres <p></p></label> 
                    <input  type='text' value={input.name} name="name"  required min='5' onChange={(e) => handleChange(e)} />
                    <span className="barra"></span>
                </div>
                <div>
                    <label className="TEXT"> Peso  min -max <p></p> </label>
                    <input  type='text' value={input.weight} name="weight" onChange={(e) => handleChange(e)} required min='1'/>
                    <span className="barra"></span>
                </div>
                <div>
                    <label className="TEXT"> Altura min - max  <p></p></label>
                    <input  type='text' value={input.height} name="height"  required min='1' onChange={(e) => handleChange(e)} />
                    <span className="barra"></span>

                </div>
                <div>
                    <label className="TEXT"> Promedio de vida <p></p></label>
                    <input  type='text' value={input.life} name="life"  required min='1' onChange={(e) => handleChange(e)} />
                    <span className="barra"></span>
                </div>
                <div>
                       <label> Imagen:<p></p> </label>
                      <input  type='text' value={input.image} name="image"  required min='1' onChange={(e) => handleChange(e)}  />
                      <span className="barra"></span>
                </div>
                 <br></br>
                 <br></br>
                <label>Temperamen:   </label>
                <br></br>
                <select onChange={(e)=> handleSelect(e)}defaultValue='default'>
                    <option value='default' disabled='default'></option>
                    {tempSeleccionados.map((el)=>(
                         <option key={el}value={el}>{el} </option>

                    ))
                    }
                    
                </select>
                < div >
               {
                     input.temperament.map(elem =>   //borrar  
                     <div key={elem.name} >
                      <h6>{elem}</h6>
                      <button onClick={(e) => handleDelete(e)}>X</button>
                     </div>
                     )
                }
              </div>
            
                 <br></br>
                 <br></br>
                 
                
                <button type='submit'  onClick={(e)=> handleSubmit(e)}>Crear Raza</button>
                <p className="warnings"  id="warnings"></p> 
                <br></br>
                <ul>{input.temperament.map(el=> el + ',')}</ul>
            </form>
               {/* < div >
               {
                     input.temperament.map(elem =>   //borrar  
                     <div key={elem.name} >
                      <h6>{elem}</h6>
                      <button onClick={() => handleDelete(elem)}>X</button>
                     </div>
                     )
                }
              </div> */}

            


       </div>

   )}
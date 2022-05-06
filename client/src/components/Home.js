import React from 'react';
import  { useEffect,Fragment,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {getDogs,orderByName,orderByWeight,orderCreated,getTemperament,filterTemperament} from '../actions';
import Paginado from './Paging';
import Card from './Card';
import SearchBar from './Searchbar';

import './styles/Home.css';
export default function Home (){

  const dispatch = useDispatch ();
  const dogies = useSelector((state)=> state.dogs);
 const tempSeleccionados=useSelector((state => state.temperam));
  const [currentPage,setcurrentPage]= useState(1);
  const [dogsPerPage,]= useState(8);   
  const indexlastDog= (currentPage * dogsPerPage );
  const indexfirstDog= (indexlastDog - dogsPerPage);
  let dogsPageActual=[];
  const  paginated=(NunberPage) =>{(setcurrentPage(NunberPage))};
  dogsPageActual=dogies.slice(indexfirstDog,indexlastDog) ;
  const [,setOrder]=useState('');
  const [,setPop]=useState('');
    useEffect (()=>{ 
        dispatch(getDogs());  //traigo los DOGS 
   },[dispatch]);

   useEffect(() => {             //traigo los temperamentos 
    dispatch(getTemperament());
    },[dispatch]); 

   useEffect(()=>{                  //me muestra desde cualquier pagina  los elementos filtrados
       setcurrentPage(1)
   },[dogies]);
   

   function handleClick(e){   //resetea paises
    e.preventDefault();
    dispatch(getDogs())
     };

 function handleSort(e){            //ordena  por abecedario
      e.preventDefault();
      dispatch(orderByName(e.target.value))
      setcurrentPage(1)
      setOrder(`Orden ${e.target.value}`)
 };

 function handlePeso(e){      //ordena  por cant poblacion
  e.preventDefault();
  dispatch(orderByWeight(e.target.value));
  setcurrentPage(1);
  setPop(`Orden ${e.target.value}`);
};






function handleCreated(e){
  dispatch(orderCreated(e.target.value))

};

function handleTemperaments(e){
  e.preventDefault();
  dispatch(filterTemperament(e.target.value));

};


     
   return(
       <div className='home'>
           <h3><Link to='/temperament'> Crear  Razas de Perros</Link></h3>

           <h1>  Bienvenidos al Home de Dogs </h1>
           <button onClick={e=>{handleClick(e)}}> Recargar Dogs</button>
           <SearchBar/>

           <div>
                <select onChange={e=>handleSort(e)}>
                    <option >Por Orden Alfabetico</option>
                    <option value='asc'>Ascendente A-Z</option>
                    <option value='desc'>Decendente Z-A</option>
                </select>

                <select  onChange={e => handlePeso(e)}>
                     <option>Por orden de  Peso</option>
                    <option value='asc'>Mayor Peso</option>
                    <option value='desc'>Menor Peso</option>
                </select>

               

                <select onChange={e=> handleCreated(e)}>
                     <option >Filtrar razas </option>
                    <option value='create'>Razas Creadas</option>
                    <option value='api'>Razas Api</option>
                    
                </select>

                
                <select onChange ={e => handleTemperaments(e)} defaultValue="default">
            <option value='default' disabled='disabled' >Filter by temperaments</option>
                <option value='allT' key="allT">All temperaments</option>
                { tempSeleccionados && tempSeleccionados.map(d =>  {
                  return(
                    <option key={d} value={d}>{d}</option>)
})}
               </select>
                

           </div>
           <div  className='Paginado'>                  
                      <Paginado
                        dogsPerPpage={dogsPerPage}
                        dogies={dogies.length}              
                        paginado={paginated}                             
                      />
                    
                </div>
           <div key={c.id}><Link to='/'><button >Volver inicio</button></Link></div>
             <div className='Card'key={c.id}> 
                {   
                dogsPageActual?.map((c) => {
                
                  return (
                <Fragment   >   
                     <Link  to={"/home/" + c.id}> 
                        <Card  name={c.name} 
                               image={c.image}
                               temperament={c.temperament}
                                weight={c.weight}
                              
                           /> 
                           <Link to={`/home/${c.id}`}> Detalles</Link>
                     </Link>
                     
                                
                 </Fragment>
                 
                 );
                   }
                )
                
               } 
          </div>
                       
       </div>
   )
}



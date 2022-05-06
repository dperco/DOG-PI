import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {getDetail} from '../actions';
import { useEffect } from 'react';

import './styles/Detail.css';

export default function Detail (props){
    
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
    },[dispatch,props.match.params.id]);

    const filtrado=useSelector((state)=> state.detail);

    if(!filtrado.temperament){filtrado.temperament='None'}
    
        return(  
           
            <div className='detalle'>
                   {console.log(filtrado)}
           
                  <div>
             
                     <p>Detalles  : {filtrado?.map((e)=>{
                      return(
                        
                         <div>
                             
                            <img src={e.image} alt=''  width='200px' />
                            <p>Nombre: {e.name}</p>
                            <p>Peso  min - max : {e.weight} kg</p>
                            <p>Altura min -max : {e.height}cm</p>
                            <p>Temperamento: {e.temperament}</p>
                            <p>Promedio de vida : {e.life}</p>
                            
                             
                         </div>
                        
                      )

                     })}
                             
                     </p>
            
                    </div>
                    
            
           
           <Link to='/home' ><button>volver</button></Link>      
        </div>
        
      
 )
   
}
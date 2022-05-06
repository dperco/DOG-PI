import React from 'react';
import './styles/Paging.css';

export default function Paginado ({dogsPerPpage,dogies,paginado}){
      const NumeroPage=[];
      for(let e=1 ; e <= Math.ceil(dogies/dogsPerPpage);e++){ 
                  NumeroPage.push(e);  
      };
      return (      
                <ul className='paginado' >
                   {
                    NumeroPage && NumeroPage.map(num => (
                    <li>
                    <button key={num} onClick={()=>paginado(num)}>{num}</button>
                    </li>
                    ))
                   };
                </ul>
            );
      };
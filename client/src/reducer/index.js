

const inicioState={
    dogs:[],
    alldogs:[],
    temperam:[],
    detail:[]
}

function rootReducer (state=inicioState,action) {
    switch (action.type){
        case 'GET_DOGS':  //traigo los dogs
               return{
                    ...state,
                    dogs: action.payload,
                    alldogs:action.payload
                       
               };
        case 'GET_NAME_DOG': 
                  //busca  dog x nombre
            //console.log(action.payload);
            return{
                ...state,
                dogs: action.payload

            }

        case 'FILTER_CREATED':          //filtra por Razas Creadas o no 
        let  alldogs2=state.alldogs;
        let filtro=[];
        
         //filtro= action.payload === 'create'? alldogs2.filter(el=> el.createDb ): alldogs2.filter(el=>!el.createDb);
        if(action.payload === 'create' ){
              filtro = alldogs2.filter(el => el.createDb);
        }else{ 
            
            filtro = alldogs2.filter(el => !el.createDb);
        }

             

        console.log(filtro)    
        
         return { 
             ...state,
             dogs: filtro
         
         };
        
        
         case 'GET_TEMPERAMENT':   //  trae los temperament
                 
                return{
                  ...state,
                  temperam : action.payload
                };
       
        
        
        case 'ORDER_BY_NAME':       //ordena por abecedario
                 let sorteArr= action.payload === 'asc' ?
                 state.dogs.sort(function(a,b){
                     if(a.name > b.name){
                         return 1;
                     }
                     if(b.name > a.name){
                         return -1;
                     }
                      return 0;
                     
                 }) :
                 state.dogs.sort(function(a,b){
                     if(a.name > b.name){
                         return -1;
                     }
                     if(b.name > a.name){
                         return 1;
                     }
                     return 0;
                 }) 
                 return{
                     ...state,
                     dogs:sorteArr
                 } ;
                 
        case 'ORDER_BY_WEIGHT':     //ordena x cantidad de peso
            
        
            const  popul= action.payload === 'desc' ? state.dogs.sort((a,b) => parseInt(a.weight) - parseInt(b.weight)):
            state.dogs.sort((a,b) =>parseInt(b.weight) - parseInt(a.weight))
            return{
                ...state,
                dogs:popul
            };

            
        case 'POST_DOGS':      //  ruta del post  de DOGS
                return{
                    ...state
                };
        case 'GET_DETAIL':
            
         
             return{             
                  ...state,
                  detail: action.payload
               };

        case 'GET_FORMS':   //  trae los temperamentos 
             
               return{
                 ...state,
                 temperam:action.payload
               };

         
               case 'FILTER_TEMPERAMENT':
                let dogs3 = state.dogs;
                console.log(dogs3);
                let dogsTemp;
                let flag=true;
                if(flag){
                    dogs3 = state.dogs
                }
                if(action.payload === 'allT'){
                    dogsTemp = state.dogs
                }
                else{
                dogsTemp = dogs3.filter(d => 
                        d.temperament && d.temperament.length && d.temperament.includes(action.payload)
                    )
                }

                
                console.log(dogsTemp);
                if(!dogsTemp.length){
                    alert('No hay dogs. resetear dogs ')
                }
                flag = true
    
                return{
                    ...state,
                    dogs: dogsTemp
                };
                  
        default : {
                return state;
              }
       
            }


};

export default rootReducer;
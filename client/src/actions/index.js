import axios from 'axios'



export function getDogs(){      //traer dogs
    return async function(dispatch){

       return await axios
            .get("http://localhost:3001/api/dogs")
            .then((res)=>{
              console.log(res.data)
                dispatch({
                    type: 'GET_DOGS',
                    payload: res.data
                })
            })
    }
};


export function orderByName(payload){    //ordenar x abecedario
    return {
        type:'ORDER_BY_NAME',
        payload
    }
} ;

export function orderByWeight(payload){  //ordenar x peso
    return {
        type:'ORDER_BY_WEIGHT',
        payload
    }
} 


export function getNameDog(name){        //buscar dog x nombre
    return async function(dispatch){
       try{
            var json = await axios.get("http://localhost:3001/api/dogs?name="+name);
           if(json.data.length){
                     return dispatch({
                     type: 'GET_NAME_DOG',
                     payload : json.data
                     });
                    }else{
                        console.log('no existe el perro ');
                    }
       }catch(error){
           console.log(error)
       }


    }
}

export function getDetail(id){    // traer dog por razas
    return async  function (dispatch){
    try{
        let json= await axios.get(`http://localhost:3001/api/dogs/${id}`);
        console.log(json.data)
        return dispatch({
            type: 'GET_DETAIL',
            payload: json.data 
        })
    }
    catch(error){
        console.log(error)
    }
}
};

export function orderCreated(payload){ // crea una raza
    return {
        type:'FILTER_CREATED',
        payload
    }
};


export function getTemperament() {        //traer  temperament
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/api/temperament",{});
        console.log(json.data);
        return dispatch({
            type:'GET_TEMPERAMENT',
            payload: json.data
})}};

export function postDogs(payload){    // el post de dogs
    return async  function (dispatch){
       try{
        let resp= await axios.post("http://localhost:3001/api/dogs",payload);
        console.log(resp)
        return dispatch({
            type: 'POST_DOGS',
            payload: resp.data
        
        })
        
       }
       catch(error){
           console.log(error)
       }
    }
};

export function filterTemperament(payload){   //filtro por temperam
    return {
        type: 'FILTER_TEMPERAMENT',
        payload
    };
};

export function getForm() {        //para agregar al formulario
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/api/temperament");
        console.log(json.data);
        return dispatch({
            type:'GET_FORMS',
            payload: json.data
})}};




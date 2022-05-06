const { Router } = require('express');
const {Dogs,Temperaments}=require('../db');
const {Op, BOOLEAN}=require('sequelize');
const router = Router();
const axios = require('axios');


const getInfoApi= async () => {               //trae toda la info  de la API
    const infoUrl= await axios.get('https://api.thedogapi.com/v1/breeds?api_key=60fd7229-8026-48f6-%208e04-35633f364441');
    const apiInfo= await infoUrl.data.map(el =>{
          return{
                 
            id:el.id,

            name: el.name, 

            weight:el.weight.metric,          
            
            height:el.height.metric,
          
            image:el.image.url,
            
            life:el.life_span,

            temperament: el.temperament
            
          }
    })
    return apiInfo;
};

const getBd = async ()=> {  //trae la info de la BD
return  await Dogs.findAll({
    include :{ 
        model: Temperaments,
        atributes : ['name'],
        through:{
            atributes:[],
        }
      }
  })
};

const getTotal = async () =>{    // junta toda info de API +  Bd 
    const infoApi=await getInfoApi();
    console.log(infoApi);
    const infoBd =await getBd();
    console.log(infoBd);
    const infoTotal =infoApi.concat(infoBd);
    
    return infoTotal
};

router.get('/',async(req,res,next)=>{
    const name=req.query.name
   
    let totaldogs=await getTotal();
    
    if(name){
         try{
        let dogName= await totaldogs.filter(el=> el.name.toLowerCase().includes(name.toLocaleLowerCase()))
        //console.log('estoy en name');
         if(dogName.length){
          res.status(200).send(dogName)}
          else {
          res.status(404).send('no hay dog');
         }
        }
         catch{ next(error)}
    }else{
        //console.log(totaldogs);
        
        res.status(200).send(totaldogs)
    }
});


router.post('/',async(req,res,next) =>{   
    try{              //crea una actividad
    const {id,name,weight,height,image,life,createDb,temperament}=req.body;
    let totalid= await getTotal(); 
    let str=temperament.toString();
    
    let aux= totalid.filter(el=> el.id === id);
    let a= false;
    let b=id;
    console.log(aux);
    if (aux.length === 0){
        a=true;
    };
    
    if (a){
       console.log('hola')

      if(name,weight,height,image,life,createDb,str){
               let newDogs=await Dogs.create({
                     id:id,
                     name:name,
                     weight:weight,
                     height:height,
                     image:image,
                     life:life,
                     createDb:createDb,
                     temperament:str
                     
                     
                   });
                   
        
         
        
          res.send(newDogs)     
       
        }else{
             res.status(404).send("error en el ingreso de campos")
        }
     }else{
         return res.send('el id  ya esta  cargado ')
     }
    }
    catch(error){
        next(error)
    }
     
}
);


router.get('/:id',async(req,res)=>{
    let {id}=req.params;
    let DogApi= await getInfoApi();
    let dogBD=await getBd();
   
    let totalDog= await getTotal();
    if(id){
         let dogId= await totalDog.filter(el => el.id == id);
         let a=dogId.length;
        // console.log(a);
        //console.log(dogId);
        //  if( dogId.length === 2 ){
        // //     console.log('hola');
        // //     console.log(dogId[1].Id);
        //      if( dogId[1].id){
        // //         // console.log('hola');
        //          newdog = await dogId.filter(el => el.createDb );
        //      }else{
        // //        // console.log('hola');
        //           newdog= await dogId.filter(el=> !el.createDb)
        //     }
        //      res.status(200).send(newdog);
        //  }else{
         res.status(200).send(dogId)
        
    }else{
         res.status(404).send('no existe dog')       
    }
    

    
     
    
})

module.exports = router;
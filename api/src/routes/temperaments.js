const { Router } = require('express');
const {Dogs,Temperaments}=require('../db');
const {Op}=require('sequelize');
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
        atributes : ['name','description'],
        through:{
            atributes:[],
        }
      }
  })
};

const getTotal = async () =>{    // junta toda info de API +  Bd 
    const infoApi=getInfoApi();
    const infoBd = getBd();
    const infoTotal = Object.assign(infoApi,infoBd);
    
    return infoTotal
};

router.get('/',async (req,res)=>{
  try{
    let totaltemp= await getTotal();
                                   //arreglo  de temperamts  repetidos 
    // let filtertemp= totaltemp.map(el => el.temperament)
    // .reduce((pre,cur)=> pre.concat(cur)).split(", ");
   let  filtertemp=totaltemp.map(d=>{
        if(d.temperament){
            return d.temperament;
        };
    }).join().split(',');

    let tempNorep=[];

    // for(let i=0 ; i< filtertemp.length ;i++){
    //     if (!tempNorep.includes(filtertemp[i])){    //arreglo  sin temperament repetidos
    //         tempNorep.push(filtertemp[i])
    //     }
    // }
    filtertemp.map(d=>{
        if(!tempNorep.includes(d.trim()) && d){
            tempNorep.push(d.trim());
            
        };
    });

    tempNorep=tempNorep.sort();  //orden alfab

    //let Tempnew= tempNorep.map(el=> {return { name:el ,}});// arreglo  de obj {name: temperament}

    //let Tempnew= await Promise.all(Tempnew.map(el => Temperaments.findOrCreate({where:el})))
    tempNorep.forEach((el)=>{
        Temperaments.findOrCreate(
            {where:{name:el}}
        )
    })
    console.log('temperamentos cargados');
    res.send(tempNorep);
    
}
catch(error){
    console.log(error)
}
    

})

module.exports = router;
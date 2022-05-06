const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dogs', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },

   weight:{
     type: DataTypes.STRING,
     allowNull:false
   },

   height:{
    type : DataTypes.STRING,
    allowNull:false
  },

  image:{
    type:DataTypes.STRING,
    allowNull:true
  },
  
  life:{
    type:DataTypes.STRING
  },
  
  createDb:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:true
  },
  temperament:{
    type:DataTypes.STRING,
    allowNull:false
  }
 

  },
  {timestamps:false},
  {freezeTableName:true,}
  );

  
 };

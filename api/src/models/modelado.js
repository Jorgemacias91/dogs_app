const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  /*sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
*/
  sequelize.define('razas', {
   
    name : {
      type : DataTypes.STRING,
      allowNull: false
    },
    height : {
      type : DataTypes.FLOAT,
      allowNull : false
    },
    weight : {
      type : DataTypes.INTEGER,
      allowNull :false
    },
    years : {
      type : DataTypes.INTEGER
    },
    sexo : {
      type : DataTypes.STRING,
      allowNull : false
    }
  })

  sequelize.define('temperamentos', {

    nameT : {
      type : DataTypes.STRING
    }
  })
  
};

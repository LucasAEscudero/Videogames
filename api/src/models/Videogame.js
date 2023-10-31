const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING), //verificar que datos va a contener
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true 
      }
    },
    released: {
      type: DataTypes.STRING,
      validate: {
        isDate: true //format: "2000-01-29" / mas de dos digitos "20+"
      }
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 5
      }
    },
    genresName: {
      type: DataTypes.ARRAY(DataTypes.STRING), //verificar que datos va a contener
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      defaultValue: 'BD'
    }
  },
  {timestamps: false});
};

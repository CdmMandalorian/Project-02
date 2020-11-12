// Creating our Animal model
module.exports = function(sequelize, DataTypes) {
  const Animal = sequelize.define("Animal", {
    animal_species: {
      type: DataTypes.STRING
    },
    longitude: {
      type: DataTypes.FLOAT
    },
    latitude: {
      type: DataTypes.FLOAT
    },
    hostile: {
      type: DataTypes.BOOLEAN
    },
    foundByUser: {
      type: DataTypes.STRING
    },
    note: {
      type: DataTypes.STRING
    },
    picture: {
      type: DataTypes.STRING
    }
  });
  return Animal;
};

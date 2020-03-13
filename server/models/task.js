'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Task extends Model{}

  Task.init({
    title: DataTypes.STRING,
    description: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'description cannot be empty'
        }
      }
    },
    category: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'category cannot be empty'
        }
      }
    },
    UserId: DataTypes.INTEGER
  },{sequelize})


  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};
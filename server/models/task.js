'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Task extends Model{}

  Task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  },{sequelize})


  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};
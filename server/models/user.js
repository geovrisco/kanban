'use strict';
module.exports = (sequelize, DataTypes) => {
  const bcrpyt=require('bcrypt')
  const Model = sequelize.Sequelize.Model
  class  User extends Model{}
  const saltRound = 10
  User.init({
    name:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Name Cannot Be Empty'
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Email cannot be Empty'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'password cannot be empty'
        }
      }
    }
  },{
    sequelize,hooks:{
      beforeCreate(instance,options){
        return bcrpyt.hash(instance.password,saltRound)
        .then(hash=>{
          instance.password=hash
        })
      }
    }
  })

  
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task,{foreignKey:"UserId"})
  };
  return User;
};
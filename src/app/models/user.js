const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {

    idUser: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement : true
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty :{
          msg : 'Esse campo não pode ser vazio'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty :{
          msg : 'Esse campo não pode ser vazio'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty :{
          msg : 'Esse campo não pode ser vazio'
        }
      }
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      select : false
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
      select : false
    }
  }, {
      tableName: 'user',
      hooks: {
        beforeCreate : usuario => {
          const salt = bcrypt.genSaltSync();
          usuario.password = bcrypt.hashSync(usuario.password, salt);
        },
        beforeUpdate : usuario =>{
          const salt = bcrypt.genSaltSync();
          usuario.password = bcrypt.hashSync(usuario.password, salt);
          }
      }
    });
  return User;
};



module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {

    cnpj: {
      type: DataTypes.STRING,
      primaryKey: true,
      validate :{
        notEmpty :{
          msg : 'Esse campo não pode ser vazio'
        }
      }
    },
    
    //Razão Social
    company: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty :{
          msg : 'Esse campo não pode ser vazio'
        }
      }
    },

    //Nome fantasia
    trade: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty :{
          msg : 'Esse campo não pode ser vazio'
        }
      }
    },

    
    ie: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty :{
          msg : 'Esse campo não pode ser vazio'
        }
      }
    },

    zip_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    adress: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    number: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    //Bairro
    district : {
      type: DataTypes.STRING,
      allowNull: true,
     
    },

    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    phone1: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    phone2: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    mail: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    site: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    employee: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    phone_employee: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
      tableName: 'provider'
    });
  
    Provider.associate = function (models) {
      Provider.hasMany(models.Invoice);
  };
  return Provider;
  
};


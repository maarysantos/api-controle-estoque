module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {

    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      
    },

    ncm: {
      type: DataTypes.INTEGER,
      allowNull:true
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty :{
          msg : 'Esse campo não pode ser vazio'
        },
        max : {
          msg : 'Não pode passar de 200 caracteres'
        }
      }
    },

    package: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty :{
          msg : 'Esse campo não pode ser vazio'
        },
        max : {
          msg : 'Não pode passar de 20 caracteres'
        }
      }
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate :{
        notEmpty :{
          msg : 'Esse campo não pode ser vazio'
        },
      }
    },

    unit_price: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      validate :{
        notEmpty :{
          msg : 'Esse campo não pode ser vazio'
        },
      }
    },

    total_price: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      validate :{
        notEmpty :{
          msg : 'Esse campo não pode ser vazio'
        },
      }
    },

    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
      tableName: 'product'
    });

    Product.associate = function (models) {
      Product.hasMany(models.Release);
  };
    return Product;
};


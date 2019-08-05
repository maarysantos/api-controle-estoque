module.exports = (sequelize, DataTypes) => {
    const Release = sequelize.define('Release', {
  
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true
      },

      
      // Fornecedor
      provider:{
        type:DataTypes.STRING ,
        allowNull:true ,
      },
  
      //data lançamento
      dt_release: {
        type: DataTypes.DATE,
        allowNull: false,
        validate :{
          notEmpty :{
            msg : 'Esse campo não pode ser vazio'
          }
        }
      },
  
      //quantidade do produto
      quantity: {
        type: DataTypes.STRING,
        allowNull: false,
        validate :{
          notEmpty :{
            msg : 'Esse campo não pode ser vazio'
          }
        }
      },
  
      //tipo de lançamento
      type_release: {
        type: DataTypes.STRING,
        allowNull: false,
        validate :{
          notEmpty :{
            msg : 'Esse campo não pode ser vazio'
          }
        }
      },
  
       nfe: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  
    }, {
        tableName: 'release'
      });
    
      Release.associate = function (models) {
        this.belongsTo(models.Product, { foreignKey: 'fk_productId' });
      };
          return Release;
    
  };
  
  
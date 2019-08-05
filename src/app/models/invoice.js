module.exports = (sequelize, DataTypes) => {
    const Invoice = sequelize.define('Invoice', {
  
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
  
      //Data de emissão
      dt_issue: {
        type: DataTypes.DATE,
        allowNull: false,
        validate : {
          notEmpty :{
            msg : 'Esse campo não pode ser vazio'
          }
        }
      },
  
      //Data de criação
      dt_create: {
        type: DataTypes.DATE,
        allowNull: true,
      },
  
    }, {
        tableName: 'invoice'
      });
    
     Invoice.associate = function (models) {
     Invoice.belongsTo(models.Provider, { foreignKey: 'fk_providerId' });
    };
    return Invoice;
    
  };
  
  
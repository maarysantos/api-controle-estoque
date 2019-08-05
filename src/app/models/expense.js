module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement : true
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty :{
          msg : 'Esse campo não pode ser vazio'
        }
      }
    },

    dt_payment: {
      type: DataTypes.DATE,
      allowNull: false,
      validate :{
        notEmpty :{
          msg : 'Esse campo não pode ser vazio'
        }
      }
    },

    //data da compra
    dt_buying: {
      type: DataTypes.DATE,
      allowNull: false,
      validate :{
        notEmpty :{
          msg : 'Esse campo não pode ser vazio'
        }
      }
    },

    price: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false,
      validate :{
        notEmpty :{
          msg : 'Esse campo não pode ser vazio'
        }
      }
    },
    
    payment_method:{ //cartão ou à dinheiro
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty :{
        msg : 'Esse campo não pode ser vazio'
      }
    },

    paid : {
      type: DataTypes.BOOLEAN ,
      defaultValue:false,
      allowNull:false
    },
    
    //tipo da despesa (pessoal ou loja)
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty :{
          msg : 'Esse campo não pode ser vazio'
        }
      }
    },
  },
   {
      tableName: 'expense'
    });
  
  return Expense;
  
};
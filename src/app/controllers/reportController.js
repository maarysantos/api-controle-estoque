const express = require ('express');
const router = express.Router();
const sequelize = require('sequelize');
const Op = sequelize.Op;
const authMiddleware = require ('../middlewares/auth');
const { Release, Product} = require ('../models');

router.use(authMiddleware);

router.get('/teste', async (req, res) =>{  //ou menos vendidos
    try{

        const seller = await Release.findAll({
            include: [{model: Product}],
            attributes: ['fk_productId', [sequelize.fn('sum', sequelize.col('quantity')), 'soma']],
            group: ['fk_productId']
        });
        res.status(200).send({seller});
    }
    catch(error){
        res.status(400).send(error);
    }
 });

 router.get('/min', async (req, res) =>{ //LIST ALL PRODUCTS WITH MINIMUM STOCK
    try {
       const products = await Product.findAll({
            attributes:['id', 'description','stock'],
            where: {
                stock:{
                    [Op.lte]: 5
                }
            }
        });

        res.status(200).send({products});
    }
    catch(error){
        res.status(400).send(error);
    }
 });

 router.get('/max', async (req, res) =>{ //LIST ALL PRODUCTS WITH MAXIMUM STOCK
    try{
        const products = await Product.findAll({
            attributes:['id', 'description','stock'],
            where : {
                stock:{
                    [Op.gte]: 5
                }
            }
        });

        res.status(200).send({products});
    }
    catch(error){
        res.status(400).send(error);
    }
 });

 module.exports = app => app.use('/reports', router);
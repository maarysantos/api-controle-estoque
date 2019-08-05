const express = require ('express');
const router = express.Router();

const authMiddleware = require ('../middlewares/auth');
const { Expense } = require ('../models');
const joi = require('joi');


router.use(authMiddleware);

router.get('/', async (req, res) => { // LIST ALL Expenses 
    try{
        const expenses = await Expense.findAll();        
        if (expenses === null || expenses === [])
            return res.send({ msg : 'Não há despesas cadastradas!' });

        return res.status(200).send({ expenses });

    } catch (error){
        res.status(400).send({});

    }
});

router.post('/', async (req, res) => { // CREATE Expense
    try{
        const expense = await expense.create(req.body);
        res.status(201).send({ expense });

    } catch (error){
        res.status(400).send({ err : 'Erro, tente novamente'})

    }
});

router.put('/:id', async (req, res) => { // UPDATE Expense (expense FOR paga OR NOT)
    try{
        const expense = await Expense.update( req.body, {where : req.params});
        res.status(200).send({ expense });

    } catch (error){
        console.log(error)
        res.status(400).send({ err : 'Não foi possível atualizar. Tente novamente!'})
    };
});

router.delete('/:id', async (req, res) => { // DELETE
    try {
        const expense = await expense.destroy({where : req.params});
        res.status(200).send({ msg : 'Despesa excluída com sucesso!'});

    } catch (error){
        res.status(400).send(error)

    }
});

module.exports = app => app.use('/expenses', router);
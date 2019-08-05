const express = require ('express');
const router = express.Router();

const authMiddleware = require ('../middlewares/auth');
const { Invoice } = require ('../models');
const joi = require('joi');


router.use(authMiddleware);

router.get('/', async (req, res) => { // LIST ALL Invoices 
    try{
        const invoices = await Invoice.findAll();        
        if (invoices === null || invoices === [])
            return res.send({ msg : 'Não há notas cadastradas!' });

        return res.status(200).send({ invoices });

    } catch (error){
        res.status(400).send({});

    }
});

router.post('/', async (req, res) => { // CREATE Invoice
    try{
        const invoice = await Invoice.create(req.body);
        res.status(201).send({ invoice });

    } catch (error){
        res.status(400).send({ err : 'Erro, tente novamente'})

    }
});

router.put('/:id', async (req, res) => { // UPDATE Invoice
    try{
        const invoice = await Invoice.update( req.body, {where : req.params});
        res.status(200).send({ invoice });

    } catch (error){
        console.log(error)
        res.status(400).send({ err : 'Não foi possível atualizar. Tente novamente!'})
    };
});

router.delete('/:id', async (req, res) => { // DELETE
    try {
        const invoice = await Invoice.destroy({where : req.params});
        res.status(200).send({ msg : 'Nota fiscal excluída com sucesso!'});

    } catch (error){
        res.status(400).send({ err : 'Não foi possível excluir. Tente novamente'})

    }
});

module.exports = app => app.use('/invoices', router);
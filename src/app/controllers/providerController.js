const express = require ('express');
const router = express.Router();

const authMiddleware = require ('../middlewares/auth');
const { Provider } = require ('../models');
const joi = require('joi');


router.use(authMiddleware);

router.get('/', async (req, res) => { // LIST ALL Providers 
    try{
        const providers = await Provider.findAll();        
        if (providers === null || providers === [])
            return res.send({ msg : 'Não há fornecedores cadastrados!' });

        return res.status(200).send({ providers });

    } catch (error){
        res.status(400).send({});

    }
});

router.post('/', async (req, res) => { // CREATE Provider
    try{
        const provider = await Provider.create(req.body);
        res.status(201).send({ provider });

    } catch (error){
        res.status(400).send({ err : 'Erro, tente novamente'})

    }
});

router.put('/:id', async (req, res) => { // UPDATE Provider
    try{
        const provider = await Provider.update( req.body, {where : req.params});
        res.status(200).send({ provider });

    } catch (error){
        console.log(error)
        res.status(400).send({ err : 'Não foi possível atualizar. Tente novamente!'})
    };
});

router.delete('/:id', async (req, res) => { // DELETE
    try {
        const provider = await Provider.destroy({where : req.params});
        res.status(200).send({ msg : 'Fornecedor excluído com sucesso!'});

    } catch (error){
        res.status(400).send({ err : 'Não foi possível excluir. Tente novamente'})

    }
});

module.exports = app => app.use('/provider', router);
const express = require ('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const xml2js = require('xml2js');
const validate = require('express-validation');
const validator = require('../validators/Product');



const authMiddleware = require ('../middlewares/auth');
const { Product, Provider, Invoice, Release } = require ('../models');

const multerConfig = require('../../config/multer');

router.use(authMiddleware);


router.get('/', async (req, res) => { // LIST ALL
    try{
        const products = await Product.findAll(); 
        return res.status(200).send({ products });

    } catch (error){
        res.status(400).send(error)

    }
});

router.get('/:id', async (req, res) => { // LIST BY ID
    try{
        const product = await Product.findOne({where : req.params});
        res.send({ product });

    } catch (error){
        res.status(400).send(error);

    }
});

router.post('/', validate(validator),  async(req, res) => { // CREATE product and lançamnto*novoproduto*
  
    try{
        let date = new Date();

        let productData = req.body;
   
        let releaseData = {
            "dt_release":date.getFullYear()+'-'+ (date.getMonth() -1) +'-'+ date.getDate(),
            "quantity":req.body.stock,
            "type_release":"entrada",
            "nfe":req.body.nfe,
            "fk_productId":req.body.id
        }

        if (await Product.findOne({where : {id: req.body.id}})){
            return res.status(400).send('Produto já existe!');
        }
           //Adicionar Transação sequelize aqui http://docs.sequelizejs.com/manual/transactions.html
           const product = await Product.create(productData);
           const release = await Release.create(releaseData);
           res.status(200).send({product, release})
    }
    catch(error){
        res.status(400).send(error);
    }
});


router.put('/:id', async (req, res) => { // UPDATE
    try{
        const product = await Product.update( req.body, {where : req.params});
        res.status(200).send({ product });

    } catch (error){
        res.status(400).send(error);
    };
});

router.delete('/:id', async (req, res) => { // DELETE
    try {
        await Product.destroy({where : req.params});
        res.status(200).send({ msg : 'Produto excluído com sucesso!'});

    } catch (error){
        res.status(400).send(erro);

    }
});

router.post('/posts', multer(multerConfig).single('file'), (req, res) => { // UPLOAD XML
    
    const fileData = `tmp/uploads/${req.file.filename}`;
    var parser = new xml2js.Parser();

    fs.readFile(fileData, 'utf-8', (err, data)=>{
        if (err){throw err;}

        parser.parseString(data.substring(0, data.length), function(err, result){
            if(!err){
                var [ notaFiscal ] = result.nfeProc.NFe;
                var [ informacao ] = notaFiscal.infNFe;
                // Objeto com dados da NotaFiscal
                var [infoNota] = informacao.ide;  
                //Objeto com dados do Fornecedor (emissor) da notaFiscal
                var [infoForn] = informacao.emit;
                //Array com todos os produtos do xml
                var produtos=[];
                informacao.det.forEach(i => {
                    var [prod] = i.prod;
                    produtos.push(prod);
                });

                 //setando atributos do banco de dados tabela FORNECEDOR
                var fornecedor = {...infoForn,
                cnpj : infoForn.CNPJ,
                ie : infoForn.IE,
                company : infoForn.xNome,
                trade : infoForn.xFant,
                zip_code: infoForn.enderEmit[0].CEP,
                adress : infoForn.enderEmit[0].xLgr,
                number : infoForn.enderEmit[0].nro,
                district : infoForn.enderEmit[0].xBairro,
                city : infoForn.enderEmit[0].xMun,
                state : infoForn.enderEmit[0].UF,
                country: infoForn.enderEmit[0].xPais,
                phone1 : infoForn.enderEmit[0].fone
                };


                //setando atributos do banco de dados tabela NOTAFISCAL

                var nota = {...infoNota,
                id:infoNota.cNF, 
                dt_issue: infoNota.dhEmi,
                dt_create : infoNota.dhSaiEnt,
                fk_providerId :infoForn.CNPJ
                };

                delete nota.cNF;
                delete nota.dhEmi;
                delete nota.dhSaiEnt;
                delete nota.nNF;
                delete nota.cDV;
                delete nota.cMunFG;
                delete nota.cUF;
                delete nota.finNFe;
                delete nota.indPag;
                delete nota.mod;
                delete nota.natOp;
                delete nota.procEmi;
                delete nota.serie;
                delete nota.tpAmb;
                delete nota.tpEmis;
                delete nota.tpNF;
                delete nota.verProc;
                delete nota.tpImp;
                delete nota.indFinal;
                delete nota.indDest;
                delete nota.indPres;
                delete nota.idDest;
                delete fornecedor.CRT;
                delete fornecedor.CNPJ;
                delete fornecedor.IE;
                delete fornecedor.xFant;
                delete fornecedor.xNome;
                delete fornecedor.enderEmit;

         var providerJson = JSON.stringify(fornecedor);
         var providerJsonFormatted= providerJson.replace(/[\[\]]/g, "");
         var providerObj = JSON.parse(providerJsonFormatted);
        
         var notaJson = JSON.stringify(nota);
         var notaJsonFormatted= notaJson.replace(/[\[\]]/g, "");
         var notaObj = JSON.parse(notaJsonFormatted);
     

              let consultaFornecedor = new Promise((resolve, reject)=>{
                const consultaFn = Provider.findOne({where : {ie: providerObj.ie}});
                resolve(consultaFn);             
             });

              let consultaNotaFiscal = new Promise((resolve, reject)=>{
                const consultaNF= Invoice.findOne({where : {id: notaObj.id}});
                resolve(consultaNF);             
             });
    
             Promise.all([consultaFornecedor, consultaNotaFiscal])
             .then (result=>{
                 if (result[0] === null){
                    Provider.create(providerObj).then((result) => {
                        console.log('ok');
                     })
                     .catch(err => {
                      console.error( err);
                     });
                 }
               
                 if(result[1] === null){
                    Invoice.create(notaObj).then(() => {
                        console.log('ok');
                      })
                      .catch(err => {
                       console.error(err);
                    });
                 }

                 res.status(200).json(produtos);

             });
        }
    });
});
});

router.post('/xml', async (req, res) => { // PRODUCTS A PARTIR DA NOTA XML selecionados no FRONT END
    var formProducts = req.body;
    const products = Object.keys(formProducts).reduce((sum, item) => {
        let [column, index] = item.split(/\[/); // extraindo o nome e o indice do campo do formulário
        index = parseInt(index.replace(/\]/)); // Removendo o fecha colchete ']' e fazendo o parse do indice pra int
        if(!sum[index]){
            sum[index] = {};// Se o indice não existir cria objeto vazio
        }
        sum[index][column] = formProducts[item]; //Preenche column de produto de um indice
        return sum;
    },[]).filter(p => p.selecionado).map(p => {
        const {selecionado, ...prod} = p;
            return prod;
    });

    try{
        /*
        const inserts = products.map(product =>{
            let consulta = await Product.findOne({where : {id : product.id}});
             if (consulta) {
                 let entrada = consulta.stock;
                 let stock = product.stock;
                 let stockAtualizado = entrada + stock;
                 await Product.update({where:{stock: stockAtualizado}})
                 
             } else {
                 await Product.create(product);
             }
        });*/

        return res.status(201).send({inserts});
    }   
    catch(error) {
        return res.status(400).send(error);
    } 
         
       
});

module.exports = app => app.use('/products', router);
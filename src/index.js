const express = require('express');
const bodyParser = require('body-parser');
const cors = require ('cors');
const morgan = require('morgan');
const logger = require ('../src/modules/logger');
const compression = require ('compression');
const helmet = require('helmet');

const app = express();

app.use(morgan('common',{
    stream :{
        write :(message) =>{
            logger.info(message);
        }
    }
}));
app.use(helmet());
app.use(cors({
    origin :['http://localhost:3001'],
    methods : ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders : ['Content_Type', 'Authorization']
}));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use ((req, res, next)=>{
    delete req.body.idUser;
    next ();
});

require('./app/controllers/index')(app);

app.listen(3000);





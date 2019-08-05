const fs = require ('fs');
const path = require ('path');

module.exports = app =>{
    fs
    //ler o diretorio
    .readdirSync(__dirname)
    // onde o "." não seja o primeiro caracter e diferente do index.js
    .filter( file => ((file.indexOf('.')) !==0 && (file !== "index.js")))
    //
    .forEach( file => require(path.resolve(__dirname, file))(app))

}


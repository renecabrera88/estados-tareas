const fs = require('fs');
const archivo = './db/data.json';

const guardarArchivo = ( data ) => {
   
    //pasa archivo JSON a stringla data y la guarda en un archivo
    //que esta definido como data.txt
    fs.writeFileSync( archivo, JSON.stringify( data));
};

const leerArchivo = () =>{

    //si no existe archivo retornar null
    if( !fs.existsSync(archivo) ){
        return null;
    }

    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
//pasa un string a jason, contrario a stringify
    const data = JSON.parse(info);
    //console.log(data);
    return data;

}



module.exports = {
    guardarArchivo,
    leerArchivo
};

const Tarea = require('./tarea');
require('colors');

class Tareas {

    _listado = {};

    get listadoArr(){
        //Pasa el json de las tareas a un arreglo
        const listado = [];
        
        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;

    }

    constructor(){
        this._listado ={};
    }
    
    borrarTarea(id=''){
        if (this._listado[id]){
            //console.log(this._listado);
            delete this._listado[id];
            //console.log(this._listado);
        }
        
    }

    cargarTareasFromArray ( tareas = []) {
        let indice =0;
        tareas.forEach( (tarea, i) =>{
            this._listado[tarea.id] = tarea;
            indice = i + 1
            if (tarea.completadoEn === 'completada'){
                console.log(`${indice.toString().green}.- ${tarea.desc} :: ${tarea.completadoEn.green}`); 
            }else if (tarea.completadoEn === 'pendiente'){
                console.log(`${indice.toString().green}.- ${tarea.desc} :: ${tarea.completadoEn.red}`);
            } else{
                console.log(`${indice.toString().green}.- ${tarea.desc} :: " "`);
            }
            
        });
       
    }

    cargarCompletadas ( tareas = []) {
        let indice = 1;
        tareas.forEach( (tarea, i) =>{
            this._listado[tarea.id] = tarea;
                if (tarea.completadoEn === 'completada'){
                    //indice.toString().green, debido a que es numero, para darle color debo pasarlo a string
                    console.log(`${indice.toString().green}.- ${tarea.desc} :: ${tarea.completadoEn.green}`); 
                    indice += 1;
                }
        });
    }

    cargarPendientes ( tareas = []) {
        let indice = 1;
        tareas.forEach( (tarea, i) =>{
            this._listado[tarea.id] = tarea;
                if (tarea.completadoEn === 'pendiente'){
                    console.log(`${indice.toString().green}.- ${tarea.desc} :: ${tarea.completadoEn.red}`);
                    indice += 1;
                }
        });
    }

    crearTarea( desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    actualizarEstado(ids = [],tareasFile = []){

        let arrNew = [];
        
        //recorre array del archivo guardado con los ids seleccionado
        //y cambia el estado de acuerdo al estado presente
        tareasFile.forEach(element=>{
            ids.forEach((element2,i)=>{
                            
                if ((element.id == element2) && (element.completadoEn == 'completada')){
                    element.completadoEn = 'pendiente';
                }else if((element.id == element2) && (element.completadoEn == 'pendiente')) {
                    element.completadoEn = 'completada';
                }else if((element.id == element2) && (element.completadoEn == null)){
                    element.completadoEn = 'completada';
                }else if (element.completadoEn == null){
                    element.completadoEn = 'pendiente';
                }; 
                            
            });
            arrNew.push(element);
                        
        });

        return arrNew;
    };

    arrayPostBorrado(id, tareasFile){
        //hago un nuevo arreglo sacando el elemento eliminado, preguntando si es distindo
        //el id, entonces pasa a hacer un push al nuevo arreglo
        let arrayNew = [];
        tareasFile.forEach(element => {
            if (element.id !== id){
            arrayNew.push(element);
            };
        });
        return arrayNew;
    };


}

module.exports = Tareas;
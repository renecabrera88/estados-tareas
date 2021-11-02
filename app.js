require('colors');

const { guardarArchivo, leerArchivo } = require('./db/guardarArchivo');
const {inquirerMenu,
       pausa,
       leerInput ,
       listadoTareaBorrar,
       confirmar,
       nostrarListadoCheckist
    } = require('./helpers/inquirer');
//const { pausa } = require('./helpers/mensajes');
//const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

const main = async ()=>{
    
    let opt = '';
    const tareas =new Tareas();

    let tareasFile;
    
    
    

    do{
        //esta opcion imprime menu y retorna la opcion seleccionada en numero
        opt = await inquirerMenu();
        //segun sea la opcion ingresada hace algo con un switch
        switch (opt){
            case '1':
                const desc  = await leerInput('Descripción: ');
                tareas.crearTarea( desc );
                guardarArchivo(tareas.listadoArr);
            break;

            case '2':
                tareasFile = leerArchivo();

                if (tareasFile){
                    //cargar tareas 
                    tareas.cargarTareasFromArray(tareasFile);
                };
            break;
            

            case '3':
                tareasFile = leerArchivo();
                
                if (tareasFile){
                    //cargar tareas 
                    tareas.cargarCompletadas(tareasFile);
                };
            break;

            case '4':
                tareasFile = leerArchivo();
                //Sconsole.log(tareasFile);
                if (tareasFile){
                    //cargar tareas 
                    tareas.cargarPendientes(tareasFile);
                };
            break;

            case '5': //actualiza los estadopendientes or completadas
                tareasFile = leerArchivo();
                
                if (tareasFile){
                    //cargar tareas 
                    const ids = await nostrarListadoCheckist(tareasFile);
                    //manda a actualizar los estados seleccionados;
                    const arrNew = tareas.actualizarEstado(ids,tareasFile);
                    guardarArchivo(arrNew);
                };
            break;

            case '6': //borrar
                tareasFile = leerArchivo();
                const testCont = JSON.stringify(tareasFile);
                
                //esta lineas cheque el archivo exista y ademas tenga contenido el arreglo
                //tuve que pasarlo string sino no podia validar contenido
                if ((tareasFile) && (testCont !=='[]')){
                    
                    //se usa aweit sino imprime 2 veces el menu
                    const id = await listadoTareaBorrar(tareasFile);
                    const ok = await confirmar('¿Esta seguro?');
                    if (ok){
                        //linea sigte la hizo FH pero no me funciono
                       //tareas.borrarTarea(id);
                       
                       const arrayNew = tareas.arrayPostBorrado(id,tareasFile);
                        
                       //mando a generar un nuevo archivo con el nuevo array sin el registros eliminado
                       guardarArchivo(arrayNew);
                       console.log('Tarea Borrada')
                    }
                }else{
                    console.log('No existe Base de Datos');
                };
            break;




        }

            



        if (opt !== '0'){
            await pausa();
        };
        
    }while ( opt !== '0' );

}

main();


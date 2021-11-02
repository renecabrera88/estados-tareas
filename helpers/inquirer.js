const inquirer = require('inquirer');
const { validate } = require('uuid');
const Tareas = require('../models/tareas');
require('colors');

const preguntas = [
    {
        type:'list',
        name:'opcion',
        message:`¿Que desea hacer?`,
        choices:[
            {
                value:'1',
                name:`${'1.'.green} Crear Tarea`
            },
            {
                value:'2',
                name:`${'2.'.green} Listar Tareas`
            },
            {
                value:'3',
                name:`${'3.'.green} Listar Tareas Completadas`
            },
            {
                value:'4',
                name:`${'4.'.green} Listar Tareas Pendientes`
            },
            {
                value:'5',
                name:`${'5.'.green} Completar Tarea(s)`
            },
            {
                value:'6',
                name:`${'6.'.green} Borrar tarea`
            },
            {
                value:'0',
                name:`${'0.'.green} Salir`
            }
        ]
    }
]

const inquirerMenu = async()=>{
    console.clear();

    console.log('============================================'.green);
    console.log('           Seleccione una Opción'.green);
    console.log('============================================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;

}

const pausa = async ()=>{
    console.log('\n');
    const question =[
        {
            type: 'input',
            name: 'enter',
            message:`Presione ${'enter'.green} para poder continuar`
        }
    ];

    await inquirer.prompt(question);
}

const leerInput = async(message) =>{

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if( value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listadoTareaBorrar = async( tareas = []) =>{
    //choices es un array
    const choices = tareas.map((tarea, i)=>{

        const idx = `${i+1}.`.green;

        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    const preguntas = [
        {
            type:'list',
            name: 'id',
            message: 'borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    
    return id;
  
}

const nostrarListadoCheckist = async( tareas = []) =>{
    //choices es un array
    const choices = tareas.map((tarea, i)=>{

        const idx = `${i+1}.`.green;

        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false 
        }
    });

    const pregunta = [
        {
            type:'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
  
}


const confirmar = async (message) =>{

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        
        }
    ]
    const {ok} = await inquirer.prompt(question);
    return ok
}  




module.exports = {
 inquirerMenu,
 pausa,
 leerInput,
 listadoTareaBorrar,
 confirmar,
 nostrarListadoCheckist
}
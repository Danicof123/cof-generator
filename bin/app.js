#!/usr/bin/env node

const inquirer = require('inquirer'),
      {createRootApp, createProject, createViews, createApp, createPkg} = require('./install'),
      pkg = require('./data');



(async ()=> {
  try{
    let app = await inquirer.prompt({
      name: 'name',
      message: 'Escribe un nombre para la aplicación',
      default: 'myApp'
    })

    pkg.name = app.name;
    createRootApp(app.name)
    createProject();

    app = await inquirer.prompt({
      name: 'description',
      message: 'Escribe una breve descripción para tu app',
      default: '...'
    })
    pkg.description = app.description;

    app = await inquirer.prompt({
      name: 'engine',
      message: 'Escoge un view engine para tu app',
      default: 'pug'
    })
    createViews(app.engine);
    pkg.engine = app.engine;

    app = await inquirer.prompt({
      name: 'port',
      message: 'Escoge un puerto para probar tu app',
      default: 3000
    })
    pkg.port = app.port;
    createApp(pkg.engine, pkg.port);
    createPkg(pkg);

    console.log(`
    
    La instalación de \x1b[36m${pkg.name}\x1b[0m resultó satisfactoria.
    Ejecuta \x1b[33m cd ${pkg.name}\x1b[0m para ingresar a la carpeta del proyecto.
    Ejecuta \x1b[33m npm install \x1b[0m para instalar las dependencias necesarias.
    Ejecuta \x1b[33m npm start \x1b[0m para iniciar la aplicación.
      
      `)
  }
  catch(err){
    console.log(err)
  }
  
})();
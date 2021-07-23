#!/usr/bin/env node

const inquirer = require('inquirer'),
      {createRootApp, createProject, createViews, createApp, createPkg} = require('./install'),
      pkg = require('./data');



(async ()=> {
  try{
    let app = await inquirer.prompt({
      name: 'name',
      message: 'Write a name for the application ',
      default: 'myApp'
    })

    pkg.name = app.name;
    createRootApp(app.name)
    createProject();

    app = await inquirer.prompt({
      name: 'description',
      message: 'Write a short description for your app ',
      default: '...'
    })
    pkg.description = app.description;

    app = await inquirer.prompt({
      name: 'engine',
      message: 'Choose a view engine for your app [pug | ejs]',
      default: 'pug'
    })
    createViews(app.engine);
    pkg.engine = app.engine;

    app = await inquirer.prompt({
      name: 'port',
      message: 'Choose a port to test your app',
      default: 3000
    })
    pkg.port = app.port;
    createApp(pkg.engine, pkg.port);
    createPkg(pkg);

    console.log(`
    
    The installation of \x1b[36m${pkg.name}\x1b[0m was successful.
    Run \x1b[33m cd ${pkg.name}\x1b[0m to enter the project folder.
    Run \x1b[33m npm install \x1b[0m to install the necessary dependencies. 
    Run \x1b[33m npm start \x1b[0m to start the application.
      
      `)
  }
  catch(err){
    console.log(err)
  }
  
})();
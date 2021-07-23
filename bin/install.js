const fs = require('fs'),
      path = require('path');

let rootDir, engines = ['ejs', 'pug'];

const mkdir = (name='') => {

  let loc = path.join(rootDir, name)
  if(fs.existsSync(loc)){
    console.log('El nombre del proyecto ya existe, el programa se cerrará automaticamente..');
    process.exit(1);
  }
  fs.mkdir(loc, err => {
    if(err){ 
      console.log('Ocurrió un error al crear el directorio, el programa se cerrará automaticamente..');
      process.exit(2);
    }
  });
}

const createRootApp = (name) => {
  rootDir = path.join(process.cwd(), name);
  mkdir()
}

const createProject = () => {
  copyFolderRecursiveSync(path.join(__dirname, '..', 'templates', 'public'), rootDir)
  copyFolderRecursiveSync(path.join(__dirname, '..', 'templates', 'source'), rootDir)
}

const createViews = (pengine) => {
  let source, engine;
  engine = pengine.toLowerCase();
  switch (engine) {
    case 'ejs':
      source = (path.join(__dirname, '..', 'templates', 'ejs', 'views'))
      break;
    default:
      source = (path.join(__dirname, '..', 'templates', 'pug', 'views'))
  }
  copyFolderRecursiveSync(source, path.join(rootDir, 'source'))
}

const createApp = (engine, port) => {
  engine = engines.includes(engine.toLowerCase()) ? engine.toLowerCase() : 'pug';
  port = (Number(port) && Number(port) > 0) ? Number(port) : 3000;

  let __app = `      //Dependencias
  const express = require('express'),
        favicon = require('serve-favicon'),
        path = require('path'),
        //variables de directorio
        faviconDir = path.join(__dirname, '..', 'public', 'images', 'favicon.png'),
        viewDir = path.join(__dirname, 'views'),
        staticDir = express.static(path.join(__dirname, '..','public')),
        //configuración de express
        port = process.env.PORT || ${port},
        app = express(),
        {error404} = require('./controllers/errorControllers'),
        //Enrutador
        router = require('./routes/index');
  
  app
      //Configuracion app
      .set('views', viewDir)
      .set('view engine', '${engine}')
      .set('port', port)
      //Uso de middleware
      .use(favicon(faviconDir))
      .use(express.json())
      .use(express.urlencoded({extended: false}))
      .use(staticDir)
      //Conectando rutas
      .use(router)
      .use(error404);
  
  module.exports = app;`

  fs.writeFileSync(path.join(rootDir, 'source', 'app.js'), __app, 'utf-8');
}

const createPkg = (pkg) => {
  let engine = engines.includes(pkg.engine.toLowerCase()) ? pkg.engine.toLowerCase() : 'pug';

  let package = {
    "name" : pkg.name.toLowerCase(),
    "version": "0.0.1",
    "description": pkg.description,
    "scripts": {
      "start": "node ./source/bin/server"
    },
    "dependencies": {
      "express": "^4.17.1",
      "serve-favicon": "^2.5.0"
    }
  }

  switch (engine) {
    case 'ejs':
      package.dependencies.ejs = "^3.1.6"
      break;
    default:
      package.dependencies.pug ="^3.0.2"
  }

  fs.writeFileSync(path.join(rootDir, 'package.json'), JSON.stringify(package, null, 2), 'utf-8');
}
// Función de un anonimo de internet (Investigar y sobreescribir mas adelante) 
const copyFileSync = ( source, target ) => {

  let targetFile = target;

  //if target is a directory a new file with the same name will be created
  if ( fs.existsSync( target ) ) {
      if ( fs.lstatSync( target ).isDirectory() ) {
          targetFile = path.join( target, path.basename( source ) );
      }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}
// Función de un anonimo de internet (Investigar y sobreescribir mas adelante)
const copyFolderRecursiveSync = ( source, target ) => {
  let files = [];

  //check if folder needs to be created or integrated
  let targetFolder = path.join( target, path.basename( source ) );
  if ( !fs.existsSync( targetFolder ) ) {
      fs.mkdirSync( targetFolder );
  }

  //copy
  if ( fs.lstatSync( source ).isDirectory() ) {
      files = fs.readdirSync( source );
      files.forEach( function ( file ) {
          let curSource = path.join( source, file );
          if ( fs.lstatSync( curSource ).isDirectory() ) {
              copyFolderRecursiveSync( curSource, targetFolder );
          } else {
              copyFileSync( curSource, targetFolder );
          }
      } );
  }
}


module.exports = {
  createRootApp,
  createProject,
  createViews,
  createApp,
  createPkg,
}
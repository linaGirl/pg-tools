# pg-tools

Create postgres database dump and restore


[![npm](https://img.shields.io/npm/dm/pg-tools.svg?style=flat-square)](https://www.npmjs.com/package/pg-tools)
[![Travis](https://img.shields.io/travis/eventEmitter/pg-tools.svg?style=flat-square)](https://travis-ci.org/eventEmitter/pg-tools)
[![node](https://img.shields.io/node/v/pg-tools.svg?style=flat-square)](https://nodejs.org/)

**Features**
- Create dump sql file of database
- Restore dump sql file to database

### Example

    var  PgTools= require('pg-tools');
    

    // create database dump sql file
    var tool = new PgTools();
     tool.dumpDatabase({
        host: 'localhost'
        , port: 5432
        , user: 'postgres'
        , password: 'postgres'
        , dumpPath: 'home/backup'
        , database: 'test'
    }, function (error, output, message) {
        if (error instanceof Error) {
           console.log(code);
        } else {
           console.log(output);
           console.log(message);
        }
    });
    // restore dump sql file to database
    var tool = new PgTools();
     tool.restoreDatabase({
        host: 'localhost'
        , port: 5432
        , user: 'postgres'
        , password: 'postgres'
        , sqlFilePath: '/home/backup/test1430762417616.sql'
        , database: 'test'
    }, function (error, output, message) {
        if (error instanceof Error) {
           console.log(code);
        } else {
           console.log(output);
           console.log(message);
        }
    });
   

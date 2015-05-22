

var Class = require('ee-class')
        , log = require('ee-log')
        , assert = require('assert')
        , os = require('os')
        , Promise = require('es6-promise').Promise
        , PgTools = require('../');

describe('Pg Tools', function () {
    var dumpSqlFileName = os.tmpdir()+'/dumppostgres'+new Date().getTime()+'.sql';
    it('Should create dump sql file', function () {
        var tool = new PgTools();
        tool.dumpDatabase({
            host: 'localhost'
            , port: 5432
            , user: 'postgres'
            , password: ''
            , dumpPath: dumpSqlFileName
            , database: 'postgres'
        }).then(function (error, output, message, dumpFileName) {
            
});
    });

    it('Should restore dump sql file', function () {
        var tool = new PgTools();
        tool.restoreDatabase({
            host: 'localhost'
            , port: 5432
            , user: 'postgres'
            , password: 'navalarti'
            , sqlFilePath: dumpSqlFileName
            , database: 'test'
        }, function (error, output, message) {
            if (error instanceof Error) {
                console.log(error);
            } else {
                console.log(output);
                console.log(message);
            }
        });
    });
});
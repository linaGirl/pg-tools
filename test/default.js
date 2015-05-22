

var Class = require('ee-class')
        , log = require('ee-log')
        , assert = require('assert')
        , os = require('os')
        , Promise = require('es6-promise').Promise
        , PgTools = require('../');

describe('Pg Tools', function () {
    var dumpSqlFileName = os.tmpdir()+'/dumppostgres'+new Date().getTime()+'.sql';
    it('Should create dump sql file', function (done) {
        var tool = new PgTools();
        tool.dumpDatabase({
            host: 'localhost'
            , port: 5432
            , user: 'postgres'
            , password: ''
            , dumpPath: dumpSqlFileName
            , database: 'postgres'
        },done);
    });

    it('Should restore dump sql file', function (done) {
        var tool = new PgTools();
        tool.restoreDatabase({
            host: 'localhost'
            , port: 5432
            , user: 'postgres'
            , password: ''
            , sqlFilePath: dumpSqlFileName
            , database: 'test'
        }, done);
    });
});
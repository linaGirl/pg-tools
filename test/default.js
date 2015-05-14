

var Class = require('ee-class')
        , log = require('ee-log')
        , assert = require('assert')
        , PgTools = require('../');

describe('Create dump sql file', function () {
    it('Should create dump sql file', function () {
        var tool = new PgTools();
        tool.dumpDatabase({
            host: 'localhost'
            , port: 5432
            , user: 'postgres'
            , password: 'navalarti'
            , dumpPath: __dirname+'/..'
            , database: 'arunav'
        }, function (error, output, message, dumpFileName) {
            if (error instanceof Error) {
                console.log(error);
            } else {
                console.log(output);
                console.log(message);
                console.log(dumpFileName);
                describe('Restore dump sql file to database', function () {
                    it('Should restore dump sql file', function () {
                        var tool = new PgTools();
                        tool.restoreDatabase({
                            host: 'localhost'
                            , port: 5432
                            , user: 'postgres'
                            , password: 'navalarti'
                            , sqlFilePath: dumpFileName
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

            }
        });
    });
});
"use strict";

!function () {

    var Class = require('ee-class')
            , util = require('util')
            , shell = require('shelljs')
            , log = require('ee-log');

    module.exports = new Class({
        init: function (options) {

        }
        , dumpDatabase: function (options, callback) {
            if (!options.host || !options.user || !options.port || !options.dumpPath || !options.database) {
                var err = new Error();
                err.message = "Invalid Options";
                err.name = "InvalidOptions";
                callback(err, null);
                return false;
            }
            var cmd = util.format("pg_dump -h %s -p %d -U %s -f %s %s", options.host, options.port, options.user, options.dumpPath, options.database);
            shell.exec(cmd, callback);
        }
        , restoreDatabase: function (options, callback) {
            if (!options.host || !options.port || !options.sqlFilePath || !options.database) {
                var err = new Error();
                err.message = "Invalid Options";
                err.name = "InvalidOptions";
                callback(err, null);
                return false;
            }
            var cmd = util.format("psql -h %s -p %d - -f %s %s", options.host, options.port, options.sqlFilePath, options.database);
            shell.exec(cmd, callback);
        }

    });
}();

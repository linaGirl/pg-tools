"use strict";

!function () {

    var Class = require('ee-class')
            , util = require('util')
            , path = require('path')
            , process = require('child_process')
            , fs = require('fs')
            , log = require('ee-log')
            , ls;

    module.exports = new Class({
        init: function (options) {

        }
        , dumpDatabase: function (options, callback) {
            if (!options.password || !options.host || !options.user || !options.port || !options.dumpPath || !options.database) {
                var error = new Error();
                error.message = "Invalid Options";
                error.name = "InvalidOptions";
                callback(error, null);
                return false;
            }
            fs.exists(options.dumpPath, function (exists) {
                if (!exists) {
                    var error = new Error();
                    error.message = "Dump path doesn't exists";
                    error.name = "InvalidPath";
                    callback(error, null);
                    return false;
                } else {

                    var time = new Date().getTime();
                    var filePath = path.join(options.dumpPath, options.database + time + '.sql');
                    var cmd = util.format("pg_dump -i -h %s -p %d -W -U %s -F c -b -v -f %s %s", options.host, options.port, options.user, filePath, options.database);

                    ls = process.exec(cmd, function (error, stdout, stderr) {
                        if (error !== null) {
                            callback(error, null, null);
                            return false;
                        }
                        callback(null, (stdout ? stdout : stderr), util.format("Pgdump %s file created successfully", filePath));

                    });
                    ls.stdin.write(options.password + '\n');
                }
            });

        }
        , restoreDatabase: function (options, callback) {
            if (!options.password || !options.user || !options.host || !options.port || !options.sqlFilePath || !options.database) {
                var err = new Error();
                err.message = "Invalid Options";
                err.name = "InvalidOptions";
                callback(err, null);
                return false;
            }
            fs.exists(options.sqlFilePath, function (exists) {
                if (!exists) {
                    var error = new Error();
                    error.message = "Dump sql path doesn't exists";
                    error.name = "InvalidFilePath";
                    callback(error, null);
                    return false;
                } else {

                    var cmd = util.format("psql -h %s -p %d -W -U %s -f %s %s", options.host, options.port, options.user, options.sqlFilePath, options.database);
                    ls = process.exec(cmd, function (error, stdout, stderr) {
                        if (error !== null) {
                            callback(error, null, null);
                            return false;
                        }
                        callback(null, (stdout ? stdout : stderr), 'Db dump file restored successfully');

                    });
                    ls.stdin.write(options.password + '\n');
                }
            });
        }

    });
}();

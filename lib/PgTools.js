!function () {
    'use strict';
    var Class = require('ee-class')
            , util = require('util')
            , path = require('path')
            , exec = require('child_process').exec
            , fs = require('fs')
            , path = require('path')
            , asyncMethod = require('async-method');

    module.exports = new Class({
        /*
         * create dump sql file of database
         * @param {Object} options, {host: 'localhost', port: 5432, user: 'postgres', password: 'postgres", dumpPath: '/home/backup',database: 'test'}
         * @param {Function} callback
         * @returns {undefined}
         */
        dumpDatabase: asyncMethod(function (options, callback) {
            process.nextTick(function () {
                var error
                        , command
                        , time
                        , filePath
                        , extName
                        , dirName
                        , ls;
                if (!options.host || !options.user || !options.port || !options.dumpPath || !options.database) {
                    error = new Error('Invalid options');
                    error.name = 'InvalidOptions';
                    callback(error, null);
                } else {
                    extName = path.extname(options.dumpPath);
                    dirName = path.dirname(options.dumpPath);
                    if (extName && extName.toLowerCase() !== '.sql') {
                        error = new Error('Invalid file type');
                        error.name = 'InvalidFileExtension';
                        callback(error, null);
                        return false;
                    }

                    fs.exists((extName === '') ? options.dumpPath : dirName, function (exists) {
                        if (!exists) {
                            error = new Error('Dump path doesn\'t exists');
                            error.name = 'InvalidPath';
                            callback(error, null);
                        } else {
                            if (extName && extName.toLowerCase() === '.sql') {
                                filePath = options.dumpPath;
                            } else {
                                time = new Date().getTime();
                                filePath = path.join(options.dumpPath, options.database + time + '.sql');
                            }
                            if (options.password) {
                                command = util.format('pg_dump -i -h %s -p %d -W -U %s -F c -b -v -f %s %s', options.host, options.port, options.user, filePath, options.database);
                            } else {
                                command = util.format('pg_dump -i -h %s -p %d --no-password -U %s -F c -b -v -f %s %s', options.host, options.port, options.user, filePath, options.database);
                            }
                            ls = exec(command, function (error, stdout, stderr) {
                                if (error !== null) {
                                    callback(error, null, null);
                                    return false;
                                }
                                callback(null, (stdout ? stdout : stderr), util.format('Pgdump %s file created successfully', filePath), filePath);

                            });
                            ls.stdin.write(options.password + '\n');
                            ls.stdin.end();
                        }
                    });
                }
            });
        })

                /*
                 * restore dump sql file to database
                 * @param {Object} options, {host: 'localhost', port: 5432, user: 'postgres', password: 'postgres", sqlFilePath: '/home/backup/test1430762417616.sql',database: 'testdb'}
                 * @param {Function} callback
                 * @returns {undefined}
                 */
        , restoreDatabase: asyncMethod(function (options, callback) {
            process.nextTick(function () {
                var error
                        , command
                        , ls;

                if (!options.user || !options.host || !options.port || !options.sqlFilePath || !options.database) {
                    error = new Error('Invalid Options');
                    error.name = 'InvalidOptions';
                    callback(error, null);
                } else {
                    fs.exists(options.sqlFilePath, function (exists) {
                        if (!exists) {
                            error = new Error('Dump sql path doesn\'t exists');
                            error.name = 'InvalidFilePath';
                            callback(error, null);
                        } else {
                            if (options.password) {
                                command = util.format('psql -h %s -p %d -W -U %s -f %s %s', options.host, options.port, options.user, options.sqlFilePath, options.database);
                            } else {
                                command = util.format('psql -h %s -p %d --no-password -U %s -f %s %s', options.host, options.port, options.user, options.sqlFilePath, options.database);
                            }
                            ls = exec(command, function (error, stdout, stderr) {
                                if (error !== null) {
                                    callback(error, null, null);
                                    return false;
                                }
                                callback(null, (stdout ? stdout : stderr), 'Db dump file restored successfully');

                            });
                            ls.stdin.write(options.password + '\n');
                            ls.stdin.end();
                        }
                    });
                }
            });
        })

    });
}();

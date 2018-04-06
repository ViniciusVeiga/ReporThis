'use strict';

const 
    path = require('path'),
    fs = require("fs");

const 
    database = path.resolve(`${__dirname}/../database/data.json`);

module.exports = (() => {
    const read = () => 
        new Promise((res, rej) => {
            fs.readFile(database, 'utf8', (err, data) => {
                if(err) {
                    rej(err);
                }
                else {
                    res(data);
                }
            })
        });

    const write = data => 
        new Promise((res, rej) => {
            fs.writeFile(database, data, 'utf8', (err, data) => {
                if(err) {
                    rej(err);
                }
                else {
                    res(data);
                }
            })
        });

    return {
        read,
        write
    };
})();
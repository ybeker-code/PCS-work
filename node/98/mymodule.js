const fs = require('fs');
const path = require('path');

module.exports = function module(dirName, extention, callBack) {
    fs.readdir(dirName, (err, files) => {
        if (err) {
            return callBack(err);
        };
        const filteredFiles = files.filter(f => {
            return path.extname(f) === '.' + extention
        });
        callBack(null, filteredFiles);
    });
};
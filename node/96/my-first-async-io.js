'use strict'
const fs = require('fs')
const path = require('path')

const folder = process.argv[2]
const ext = '.' + process.argv[3]

fs.readdir(folder, function (err, files) {
    if (err) return console.error(err)
    files.forEach(function (file) {
        if (path.extname(file) === ext) {
            console.log(file)
        }
    })
})


// const { log } = require('console');
// const p = require('path');
// const fs = require('fs');

// const path = process.argv[2];

// const ex = '.' + process.argv[3];

// fs.readdir(path, (err, list) => {
//     if (err) {
//         return console.log(err);
//     }
//     list.forEach(f => {
//         if (f.isFile() && ex === p.extname(f))
//             console.log(f);
//     })
// })

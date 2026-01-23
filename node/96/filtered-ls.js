const { log } = require('console');
const fs = require('fs');

fs.readFile(process.argv[2], (err, result) => {
    if (err) {
        return console.log(err);
    }

})
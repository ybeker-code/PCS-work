'use strict'
const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    const readStream = fs.createReadStream(process.argv[3])
    readStream.pipe(response);
})
server.listen(process.argv[2])
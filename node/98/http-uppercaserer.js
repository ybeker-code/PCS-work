'use strict'
const http = require('http');
const fs = require('fs');

let post = '';
const server = http.createServer((request, response) => {
    request.on('data', chunk => { post += chunk.toString().toUpperCase(); })
    request.on('end', () => {
        response.end(post);
    })
})
server.listen(process.argv[2])
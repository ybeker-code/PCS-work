'use strict'
const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    const url = new URL(request.url, 'http://localhost')
    const iso = url.searchParams.get('iso');
    if (url.pathname === '/api/parsetime') {
        const d = new Date(iso);
        response.end(JSON.stringify({
            hour: d.getHours(),
            minute: d.getMinutes(),
            second: d.getSeconds()
        }));
    } else if (url.pathname === '/api/unixtime') {
        const d = new Date(iso);
        response.end(JSON.stringify({ "unixtime": d.getTime() }));
    }
})
server.listen(process.argv[2])
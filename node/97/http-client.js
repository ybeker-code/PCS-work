const http = require('http');

http.get(process.argv[2], response => {
    response.setEncoding('utf-8');
    response.on('error', (err) => { return console.error(err) });
    response.on('data', (data) => {
        console.log(data);
    });
});


const http = require('http');

let text = ''
http.get(process.argv[2], response => {
    response.setEncoding('utf-8');
    response.on('error', (err) => { return console.error(err) });
    response.on('data', (data) => {
        text = text + data
    });
    response.on('end', () => {
        console.log(text.length);
        console.log(text);
    });
});
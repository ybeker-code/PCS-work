const http = require('http');

const texts = []
let finished = 0;
for (let index = 2; index < 5; index++) {
    let text = ''
    http.get(process.argv[index], response => {
        response.setEncoding('utf-8');
        response.on('error', (err) => { return console.error(err) });
        response.on('data', (data) => {
            text = text + data;
        });
        response.on('end', () => {
            texts[index - 2] = text;
            finished++;
            if (finished === 3) {
                printTexts();
            }
        });
    });
}

function printTexts() {
    texts.forEach(element => {
        console.log(element);
    });
}

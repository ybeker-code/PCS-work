const { log } = require('console');
const fs = require('fs');

const file = fs.readFileSync(process.argv[2], 'utf-8')

const array = file.split('\n');

console.log(array.length - 1);

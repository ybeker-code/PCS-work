const mymodule = require('./mymodule.js')

const dir = process.argv[2];
const extention = process.argv[3];

mymodule(dir, extention, (err, list) => {
    if (err) {
        return console.error(err);
    }
    list.forEach(f => console.log(f));
});


import express from "express";

const app = express();

app.get('/add', (req, res, next) => {

    const a = +req.query.a;
    const b = +req.query.b;

    if (isNaN(a) || isNaN(b)) {
        const error = new Error('Make sure you are sending 2 numbers.');
        //console.log(error);

        throw error;
    }
    console.log(a + b);

    res.send(a + b);
})

app.get('/subtract', (req, res, next) => {

    const a = +req.query.a;
    const b = +req.query.b;

    if (isNaN(a) || isNaN(b)) {
        const error = new Error('Make sure you are sending 2 numbers.');
        //console.log(error);

        throw error;
    }
    console.log(a - b);

    res.send(a - b);
})

app.get('/operator', (req, res, next) => {

    const a = +req.query.a;
    const b = +req.query.b;
    const o = req.query.o;

    if (isNaN(a) || isNaN(b)) {
        const error = new Error('Make sure you are sending 2 numbers.');
        //console.log(error);

        throw error;
    }

    switch (o) {
        case '+':
            res.send(a + b);
            break;
        case '-':
            res.send(a - b);
            break;
        case '*':
            res.send(a * b);
            break;
        case '/':
            res.send(a / b);
            break;

        default:
            res.send('Ooops! you did something wrong.');
            break;
    }
})

app.param('a', (req, res, next) => {
    req.a = +req.params.a;
    if (isNaN(req.a)) {
        const error = new Error('Make sure you are sending 2 numbers.');
        //console.log(error);

        throw error;
    }
    next();
})

app.param('b', (req, res, next) => {
    req.b = +req.params.b;
    if (isNaN(req.b)) {
        const error = new Error('Make sure you are sending 2 numbers.');
        //console.log(error);

        throw error;
    }
    next();
})

app.get('/add/:a/:b', (req, res, next) => {
    res.send(req.a + req.b)
})

app.get('/subtract/:a/:b', (req, res, next) => {
    res.send(req.a - req.b)
})

app.get('/operator/:a/:b/:o', (req, res, next) => {
    switch (req.params.o) {
        case '+':
            res.send(req.a + req.b);
            break;
        case '-':
            res.send(req.a - req.b);
            break;
        case '*':
            res.send(req.a * req.b);
            break;
        case '/':
            res.send(req.a / req.b);
            break;

        default:
            res.send('Ooops! you did something wrong.');
            break;
    }
})
app.listen(80);
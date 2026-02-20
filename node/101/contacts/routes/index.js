var express = require('express');
var router = express.Router();

let contacts = [
  {
    id: 1,
    first: 'Donald',
    last: 'Trump',
    phone: '1234567890',
    email: 'dtrump@whitehouse.gov'
  },
  {
    id: 2,
    first: 'JD',
    last: 'Vance',
    phone: '9876543210',
    email: 'jd@whitehouse.gov'
  }
];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('layout', {
    title: 'Contact List',
    contacts,
    noContacts: !contacts?.length,
    partials: { content: 'index.hjs' }
  });
});

router.get('/addContact', (req, res, next) => {
  res.render('layout', {
    title: 'Add Contact',
    partials: { content: 'addContact.hjs' }
  });
});

router.post('/addContact', (req, res, next) => {
  console.log(req, req.body, 'inside addContact');

  contacts.push(req.body);

  res.writeHead(301, {
    location: '/'
  });

  res.end();
});

router.post('/deleteContact/:id', (req, res, next) => {
  contacts = contacts.filter(c => c.id !== Number(req.params.id));

  res.writeHead(301, {
    location: '/'
  });

  res.end();
});

router.param('id', (req, res, next) => {
  req.contact = contacts.find(c => c.id === +req.params.id);
  next();
});

router.get('/editContact/:id', (req, res, next) => {
  //const contact = contacts.find(c => c.id === +req.params.id);
  res.render('layout', {
    title: 'Edit Contact',
    contact: req.contact,
    partials: { content: 'addContact.hjs' }
  });
});

router.post('/editContact/:id', (req, res, next) => {
  const index = contacts.findIndex(c => c.id === +req.params.id)
  req.body.id = +req.params.id;
  if (index > -1) contacts[index] = req.body;

  res.writeHead(301, {
    location: '/'
  });

  res.end();
});

router.get('/api/contacts', function (req, res, next) {
  res.json(contacts);
});

router.get('/api/contacts/:id', function (req, res, next) {
  if (req.contact) res.json(req.contact);
  else {
    res.statusCode = 404;
    res.send(`cannot find contact with id ${req.params.id}`)
  }
});

module.exports = router;

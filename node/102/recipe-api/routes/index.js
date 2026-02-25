var express = require('express');
var router = express.Router();
var pool = require('../pool.js');
//import pool from '../pool.js';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.route('/api')
  // get all the recipes
  .get(async (req, res, next) => {
    try {
      const [results] = await pool.execute('SELECT id, name, description FROM recipes');
      res.json(results);
    }
    catch (err) {
      return next(err);
    }
  })
  // add a recipe 
  .post(async (req, res, next) => {
    // validate

    try {
      const [results] = await pool.execute(`INSERT INTO recipes (name, description, instructions) VALUES (?,?,?)`,
        [req.body.name, req.body.description, req.body.instructions]);
      req.body.id = results.insertId;
      res.status(201)
        .location(`/api/${req.body.id}`)
        .json(req.body);
    } catch (err) {
      return next(err);
    }
  });

router.route('/api/:id')
  // get one recipe by id
  .get(async (req, res, next) => {
    try {
      const [results] = await pool.execute('SELECT id, name, description, instructions FROM recipes WHERE id = ?',
        [req.params.id]);
      if (!results.length) {
        res.statusCode = 404;
        return res.send(`Cannot find recipe ${req.params.id}`);
      }
      res.json(results[0]);
    }
    catch (err) {
      return next(err);
    }
  })
  // update a recipe
  .put(async (req, res, next) => {
    try {
      const [results] = await pool.execute('UPDATE recipes SET name=?, description=?, instructions=? WHERE id = ?',
        [req.body.name, req.body.description, req.body.instructions, req.params.id]
      )
      if (!results.affectedRows) {
        res.statusCode = 404;
        return res.send(`Cannot find recipe ${req.params.id}`);
      }
      res.statusCode = 204;
      res.end();
    } catch (err) {
      return next(err);
    }
  })
  // delete a recipe
  .delete(async (req, res, next) => {
    try {
      const [results] = await pool.execute('DELETE FROM recipes WHERE id = ?',
        [req.params.id]
      )
      if (!results.affectedRows) {
        res.statusCode = 404;
        return res.send(`Cannot find recipe ${req.params.id}`);
      }
      res.statusCode = 204;
      res.end();
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;

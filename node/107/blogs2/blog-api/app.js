import express from 'express';
import http from 'http';
import { MongoClient } from 'mongodb';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(async (req, res, next) => {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    const db = await client.db('blog');

    req.posts = await db.collection('posts');

    next();
  } catch (e) {
    next(e);
  }
});

/*app.use((req, res, next) => {
  //res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  next();
});*/

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.get('/posts', async (req, res, next) => {
  const posts = await req.posts.find()/*.sort({date: 1}).skip(2).limit(2)*/.toArray()
  res.send(posts);
})

app.post('/addPost', async (req, res, next) => {
  try {
    await req.posts.insertOne(req.body);
    console.log(req.body, 'api says a post was added')
    res.status(201).json({ message: "Post added!" });
  } catch (e) {
    next(e)
  }

  //res.redirect('/posts');
  //next();
})

app.use(function (req, res, next) {
  const error = new Error('404. Not found');
  error.statusCode = 404;
  next(error);
});

app.use(function (err, req, res, next) {
  res.statusCode = err.statusCode || 500;
  res.end(err.message);
});

server.listen(8080);

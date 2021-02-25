const express = require('express');
const fs = require('fs');
const app = express();
const handler = require('./handler');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/', express.static('./src'));

app.get('/notes', (req, res) => {
  fs.readFile('./server/db/notes.json', 'utf-8', (err, data) => {
    if (err){
      res.send(JSON.stringify({result: 0, text: err}))
    }else {
      res.send(data)
    }
  })
})

app.post('/notes', (req, res) => {
  handler(req, res, 'add', './server/db/notes.json');
})
app.put('/notes', (req, res) => {
  handler(req, res, 'edit', './server/db/notes.json');
})
app.delete('/notes/:id', (req, res) => {
  handler(req, res, 'remove', './server/db/notes.json');
})

app.listen(3000, () => {
  console.log(`Listening 3000 port`)
});
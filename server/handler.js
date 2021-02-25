const fs = require('fs');
const notes = require('./notes');

const actions = {
  add: notes.add,
  edit: notes.edit,
  remove: notes.remove,
}

const handler = (req, res, action, file) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err){
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    }else {
      const newNotes = actions[action](JSON.parse(data), req);
      fs.writeFile(file, newNotes, (err) => {
        if (err){
          res.send('{"result": 0}');
        }else {
          res.send('{"result": 1}')
        }
      })
    }
  })
}
module.exports = handler;
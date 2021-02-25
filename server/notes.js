
const add = (notes, req) => {
  notes.contents.push(req.body);
  return JSON.stringify(notes, null, 4);
};
const edit = (notes, req) => {
  const id = req.body.id
  notes.contents[id] = req.body;
  return JSON.stringify(notes, null, 4);
}
const remove = (notes, req) => {
  const idx = req.params.id;
  notes.contents.splice(idx, 1);
  return JSON.stringify(notes, null, 4);
}

module.exports = {
  add,
  edit,
  remove,
}
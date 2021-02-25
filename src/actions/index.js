import { createAction } from 'redux-actions';

export const add = createAction('[Notes] Add Note');
export const remove = createAction('[Notes] Remove Note');
export const load = createAction('[Notes] Load Notes')

export function loadNotes(){
  return function (dispatch){
    fetch('http://localhost:3000/notes')
      .then(res => res.json())
      .then((notes) => {
        dispatch(load(notes))
      })
  }
}
export function addNote(note){
  return function (dispatch){
    fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(note)
    })
    .then(() => {
      dispatch(add(note))
    })
  }
}
export function editNote(note){
  return function (dispatch){
    fetch('http://localhost:3000/notes', {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(note)
    })
    .then(() => {
      dispatch(add(note))
    })
  }
}
export function removeNote(id){
  return function (dispatch){
    fetch(`http://localhost:3000/notes/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      dispatch(remove(id))
    })
  }
}
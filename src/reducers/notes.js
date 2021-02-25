import { handleActions } from 'redux-actions';
import { Map, fromJS } from 'immutable';
import { add, remove, load } from 'actions';
import moment from 'moment';
const initialState = new Map({
  notes: new Map()
})

export const notesReducer = handleActions({
  [load]: (state, action) => {
    const notes = action.payload.contents.reduce((acc, item) => {
      acc.push({ ...item })
      
      return acc
    }, [])
    return state.set('notes', fromJS(notes))
  },
  [add]: (state, action) => {
    const { id } = action.payload;
    debugger
    return state.setIn(['notes', id], fromJS({ ...action.payload }))
  },
  [remove]: (state, action) => {
    return state.removeIn(['notes', action.payload])
  }
}, initialState)
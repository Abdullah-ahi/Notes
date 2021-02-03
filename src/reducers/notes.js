import { handleActions } from 'redux-actions';
import { Map, fromJS } from 'immutable';
import { add } from 'actions';

const initialState = new Map({
  notes: new Map()
})

export const notesReducer = handleActions({
  [add]: (state, action) => {
    const { id } = action.payload
    return state.setIn(['notes', id], fromJS({...action.payload, timestamp: new Date()}))
  }
}, initialState)
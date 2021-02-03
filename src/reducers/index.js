import { combineReducers } from 'redux';
import { notesReducer } from './notes';
import { connectRouter } from 'connected-react-router';

export const initReducer = history => combineReducers({
  router: connectRouter(history),
  notes: notesReducer
})
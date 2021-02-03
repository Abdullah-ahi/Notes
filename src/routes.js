import { notesRedux } from 'containers/notesContainer';

export const routes = [
  {
    path: '/',
    exact: true,
    component: notesRedux,
  }
]
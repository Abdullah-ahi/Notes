import React, { PureComponent } from 'react';
import { Notes } from 'components/notes';
import { connect } from 'react-redux';
import { addNote, removeNote, editNote, loadNotes } from 'actions'

class notesContainer extends PureComponent {

  componentDidMount(){
    const { loadNotes } = this.props;
    loadNotes();
  }
  render(){
    const { addNote, removeNote, editNote, id, notes } = this.props
    return(
      <Notes addNote={addNote} id={id} notes={notes} remove={removeNote} edit={editNote}/>
    )
  }
}
function mapStateToProps(state, ownProps){
  const notes = state.notes.get('notes').toList().toJS();
  const id = notes.length
  return {
    id,
    notes,
  }
}
function mapDispatchToProps(dispatch){
  return {
    loadNotes: () => dispatch(loadNotes()),
    addNote: (note) => dispatch(addNote(note)),
    removeNote: (id) => dispatch(removeNote(id)),
    editNote: (note) => dispatch(editNote(note))
  }
}

export const notesRedux = connect(mapStateToProps, mapDispatchToProps)(notesContainer)
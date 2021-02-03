import React, { PureComponent } from 'react';
import { Notes } from 'components/notes';
import { connect } from 'react-redux';
import { add } from 'actions'

class notesContainer extends PureComponent {
  render(){
    const { addNote, id, notes } = this.props
    return(
      <Notes addNote={addNote} id={id} notes={notes}/>
    )
  }
}
function mapStateToProps(state, ownProps){
  const notes = state.notes.get('notes').toList().toJS();
  const lastId = state.notes.get('notes').size ? state.notes.get('notes').last().get('id') : -1;
  const id = lastId+1
  return {
    id,
    notes,
  }
}
function mapDispatchToProps(dispatch){
  return {
    addNote: (note) => dispatch(add(note))
  }
}

export const notesRedux = connect(mapStateToProps, mapDispatchToProps)(notesContainer)
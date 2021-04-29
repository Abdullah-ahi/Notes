import React, { Component, Fragment } from 'react';
import { TextField, List, ListItem, ListItemText, Button } from '@material-ui/core';
import './notes.css'
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import DeleteIcon from '@material-ui/icons/Delete';

import classNames from 'classnames';
import moment from 'moment';
moment.locale('ru')

export class Notes extends Component {
  state = {
    name: '',
    description: '',
    lastDesc: '',
    editBtnsIsVisible: false,
    formIsVisible: false,
    formOpenBtnVisible: true,

  }

  handleInputChange = (event) => {
    const fieldName = event.target.name
    this.setState({
      [fieldName]: event.target.value
    })
  }
  addNote = () => {
    const { name, description } = this.state
    const { addNote, id } = this.props
    addNote({id, name, description, timestamp: new Date()})
    this.setState({
      name: '',
      description: '',
      formIsVisible: false
    })
  }
  showDescription = (id, desc) => {
    const { lastDesc } = this.state
    if (lastDesc.classList){
      lastDesc.classList.add('note-desc') // Если открыта предыдущая заметка, то закрываем ее
    }
    let descriptions = Array.from(document.querySelectorAll('.note-desc'))
    let currentDesc = descriptions.find(desc => desc.dataset.id == id); //Находим текущую открытую заметку
    if (currentDesc){
      currentDesc.classList.remove('note-desc') // Показываем на странице текстовое поле
    }
    let descInput = currentDesc.querySelector('.MuiInput-input') //Находится текстовое поле в элементе UI
    descInput.textContent = desc // Добавляем описание текущей заметки в это текстовое поле
    descInput.setAttribute('readonly', true)
    this.setState({
      lastDesc: currentDesc,
      formOpenBtnVisible: false,
    })
  }
  closeDescription = (desc) => {
    const { lastDesc } = this.state
    let descInput = lastDesc.querySelector('.MuiInput-input') //Находится текстовое поле в элементе UI
    descInput.value = desc;
    lastDesc.classList.add('note-desc')
    this.setState({
      formOpenBtnVisible: true,
    })
  }
  editNote = () => {
    const { lastDesc } = this.state
    let descInput = lastDesc.querySelector('.MuiInput-input') //Находится текстовое поле в элементе UI
    descInput.removeAttribute('readonly')
    this.setState({
      editBtnsIsVisible: true,
    })
  }
  handleEditDescription = (id, name) => {
    const { description, lastDesc } = this.state;
    const { edit } = this.props
    if (description.length){
      edit({id, name, description, timestamp: new Date()})
    }
    this.setState({
      editBtnsIsVisible: false,
      description: '',
    })
    let descInput = lastDesc.querySelector('.MuiInput-input'); //Находится текстовое поле в элементе UI
    descInput.setAttribute('readonly', true);
  }
  handleCancelEdit = (desc) => {
    const { lastDesc } = this.state
    let descInput = lastDesc.querySelector('.MuiInput-input') //Находится текстовое поле в элементе UI
    descInput.value = desc;
    descInput.setAttribute('readonly', true);
    this.setState({
      editBtnsIsVisible: false,
      description: '',
    })
  }
  openForm = () => {
    const { formIsVisible } = this.state;
    this.setState({
      formIsVisible: true,
    })
  }
  cancelNoteAdd = () => {
    const { formIsVisible } = this.state;
    this.setState({
      formIsVisible: false,
    })
  }
  removeNote = (id) => {
    const { remove } = this.props;
    remove(id)
    this.setState({
      formOpenBtnVisible: true,
    })
  }
  render(){
    const { name, description, editBtnsIsVisible, formIsVisible, formOpenBtnVisible } = this.state
    const { notes } = this.props;
    console.log(notes)
    const editBtnsClasses = classNames('desc-edit-btns', {
      'hide': !editBtnsIsVisible
    })
    const formClasses = classNames('note-add-form', {
      'hide': !formIsVisible
    })
    const formOpenBtnClasses = classNames('note-add-form-open-btn', {
      'hide': formIsVisible || !formOpenBtnVisible
    })
    return(
      <Fragment>
        <div className="notes-block">
          <List>
            {
              notes.map((note, idx) => 
              <ListItem className='note' key={idx}>
                <div className="note-data">
                  <ListItemText className='note-name' primary={note.name}/>
                  <p className="noteDate">{moment(note.timestamp).format('lll')}</p>
                  <p className='note-time-interval'>{moment(note.timestamp).fromNow()}</p>
                </div>
                <DeleteIcon className='note-delete-icon' fontSize='default' onClick={() => this.removeNote(idx)}/>
                <Button onClick={() => this.showDescription(note.id, note.description)} className='open-note-btn' variant="outlined" color="secondary">Открыть</Button>
                <div data-id={note.id} className='note-desc show-desc'>
                  <div className='desc-controls-icons'>
                    <SpellcheckIcon onClick={this.editNote}/>
                    <CancelPresentationIcon onClick={() => this.closeDescription(note.description)} className='desc-close-icon'/>
                  </div>
                  <TextField name='description' onChange={this.handleInputChange} multiline={true} className='note-desc-input'/>
                  <div className={editBtnsClasses}>
                    <Button onClick={() => this.handleEditDescription(idx, note.name)}>Сохранить</Button>
                    <Button onClick={() => this.handleCancelEdit(note.description)}>Отмена</Button>
                  </div>
                </div>
              </ListItem>)
            }
          </List>
          <Button className={formOpenBtnClasses} onClick={this.openForm} variant="outlined" color="secondary">Добавить заметку</Button>
          <div className={formClasses}>
            <TextField onChange={this.handleInputChange} name='name' label="Название" variant="outlined" value={name}/>
            <TextField onChange={this.handleInputChange} name='description' label="Описание" variant="outlined" value={description}/>
            <div className="form-control-btns">
              <Button onClick = {this.cancelNoteAdd} variant="outlined" color="secondary">Отмена</Button>
              <Button onClick = {this.addNote} variant="outlined" color="secondary">Добавить</Button>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

import React, { useContext, useEffect, useRef, useState } from 'react'
import { NoteContext } from '../context/notes/NoteState'
import NoteItem from './NoteItem'

const Notes = (props) => {
    const { notes, getNotes, updateNote } = useContext(NoteContext)
    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])
    
    // For the modal
    const ref = useRef(null)
    const [note, setNote] = useState({title:"",description:"",tag:"",id:""})
    const saveButtonDisabled = note.title.length < 3 || note.description.length < 5

    const onClickingEditNoteIcon = (currentNote) => {
        //opens the modal
        ref.current.click()

        //populates the form in the modal with current note values
        setNote({title: currentNote.title ,description: currentNote.description ,tag: currentNote.tag, id: currentNote._id})
    }

    //Inside the modal
    const onChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value})

    }

    const onSave = () => {
        updateNote(note)
        props.showAlert("success", "Note updated")

    }

    return (
        <>  
            {/* Below button will not be displayed, it will only be clicked to display the below modal*/}
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>

            {/* Modal : To Edit a Note */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onSave} disabled={saveButtonDisabled}>Save</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3 mx-5">
                <h2>Your Notes</h2>
                {notes.length === 0 && <div>No Notes to display</div>}
                {notes.map(note => <NoteItem note={note} key={note._id} onClickingEditNoteIcon = {onClickingEditNoteIcon} showAlert={props.showAlert}/>)}
            </div>
        </>
    )
}

export default Notes
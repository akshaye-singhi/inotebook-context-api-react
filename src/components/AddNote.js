import React, {useState, useContext, useRef} from 'react'
import { NoteContext } from '../context/notes/NoteState'

const AddNote = (props) => {
    // to empty the fields once the note is added
    const ref = useRef(null)

    const {addNote} = useContext(NoteContext)
    const [note, setNote] = useState({title:"",description:"",tag:""})
    const onChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value})
    }
    const onSubmit = (e) => {
        e.preventDefault() // to prevent page reload
        addNote(note.title, note.description, note.tag)
        ref.current.reset()
        props.showAlert("success", "Note added")
    }
    
    return (
        <>
            <div className='container'>
                <h2 className='my-3'>Add Note</h2>
                <form ref={ref} onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" required minLength={3} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" required minLength={5} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Note</button>
                </form>
            </div>
        </>
    )
}

export default AddNote
import React, { createContext, useState } from 'react'
const host = "http://localhost:5000"
//const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlMjdmZDcwMDcxZjA3YzVhY2Y5YTFjIn0sImlhdCI6MTY1OTU1MDM5Nn0.56v3GBMhNFHQ0QT6oUcxfdgIflf96-JxD9ZI6-2g3Js"

export const NoteContext = createContext();

// Global note state
export const NoteState = (props) => {
    const [notes, setNotes] = useState([]);
    
    const getNotes = async () => {
        // Default options are marked with *
        const url = `${host}/api/notes/fetch`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('iNotebook-auth-token')
            }
        });
        const json = await response.json()
        setNotes(json)
    }

    const addNote = async (title, description, tag) => {
        const url = `${host}/api/notes/add`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('iNotebook-auth-token')
            },
            body: JSON.stringify({title, description, tag})
        });
        setNotes(notes.concat(await response.json()))
    }

    const deleteNote = async (id) => {
        const url = `${host}/api/notes/delete/${id}`
        await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('iNotebook-auth-token')
            }
        });
        setNotes(notes.filter(note => note._id !== id))
    }

    const updateNote = async (note) => {
        //update in backend
        const {title, description, tag} = note
        const url = `${host}/api/notes/update/${note.id}`
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('iNotebook-auth-token')
            },
            body: JSON.stringify({title, description, tag})
        });

        //update in UI
        // creating a copy of the state variable "notes", because we can only edit a React state by using it's setState function, and not by any other method
        const newNotes = JSON.parse(JSON.stringify(notes))
        newNotes.forEach(noteItem => {
            if(noteItem._id === note.id) {
                noteItem.title = note.title
                noteItem.description = note.description
                noteItem.tag = note.tag
            } 
        })
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, updateNote }}>
            {props.children}
        </NoteContext.Provider>
    );
}
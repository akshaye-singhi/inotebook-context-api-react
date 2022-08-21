import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import AddNote from './AddNote'
import Notes from './Notes'
const host = "http://localhost:5000"

const Home = (props) => {
    const navigate = useNavigate()
    useEffect(() => {
        const checkLogin = async () => {
            const url = `${host}/api/auth/getuser`
            const authToken = localStorage.getItem('iNotebook-auth-token')
            if (authToken === null) {
                navigate('/login')
            }
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken
                }
            })
            const json = await response.json()
            if (!json.success) {
                navigate('/login')
            }
        }
        // Todo: Home page not loading on login, reload required : removing below square brackets is not working
        checkLogin()
        // eslint-disable-next-line
    }, [])
    return (
        <div className='mx-3'>
            <AddNote showAlert={props.showAlert}/>
            <Notes showAlert={props.showAlert}/>
        </div>
    )
}

export default Home
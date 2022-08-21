import React, { useState, useRef } from 'react'
// import { useNavigate } from 'react-router-dom'
const host = "http://localhost:5000"

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const loadHomePageRef = useRef(null)
    // const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault() // to prevent page reload
        
        // email validation
        const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
        const emailValid = emailRegex.test(credentials.email)
        if(!emailValid){
            props.showAlert("danger", "Please enter a valid email")
            return
        }

        const url = `${host}/api/auth/login`
        const response = await fetch(
            url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            }
        )
        const json = await response.json()
        if (!json.success) {
            props.showAlert("danger", json.error === "Invalid email" ? "Invalid email: Please Signup" : json.error)
        } else {
            // Once login is successful, store auth-token in local storage and redirect to home page
            localStorage.setItem('iNotebook-auth-token', json.auth_token)
            // navigate('/')
            // props.showAlert("success", "Logged In Successfully !!")
            loadHomePageRef.current.click()
        }

    }

    return (

        <div className='container my-3'>
            <form onSubmit={onSubmit}>
                <div className="form-group my-2">
                    <input type="email" className="form-control" id="email" name="email" placeholder="Email address" required style={{ width: '20%' }} onChange={onChange} />
                </div>
                <div className="form-group my-2">
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" required style={{ width: '20%' }} onChange={onChange} />
                </div>
                <div className="my-3">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
            <a className='d-none' ref={loadHomePageRef} href='/'>This element when clicked loads home page</a>
        </div>
    )
}

export default Login
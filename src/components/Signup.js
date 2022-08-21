import React, { useState, useRef } from 'react'
// import { useNavigate } from 'react-router-dom'
const host = "http://localhost:5000"

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" })
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const passwordsMatch = credentials.password === credentials.confirmPassword

    // To navigate to home page once signup is successful
    const loadHomePageRef = useRef(null)
    // const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault() // to prevent page reload

        // email validation
        const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
        const emailValid = emailRegex.test(credentials.email)
        if (!emailValid) {
            props.showAlert("danger", "Please enter a valid email")
            return
        }

        const url = `${host}/api/auth/createuser`
        const response = await fetch(
            url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
            }
        )
        const json = await response.json()
        if (!json.success) {
            props.showAlert("danger", "A user with this email already exists !!")
        } else {
            // Once login is successful, store auth-token in local storage and redirect to home page
            localStorage.setItem('iNotebook-auth-token', json.auth_token)
            // navigate('/')
            // props.showAlert("success", "Account Created Successfully !!")
            loadHomePageRef.current.click()
        }

    }

    return (
        <div className="container my-3">
            <form onSubmit={onSubmit}>
                <div className="form-group my-3">
                    <input type="text" className="form-control" id="name" name="name" placeholder="Name" minLength={2} required style={{ width: '20%' }} onChange={onChange} />
                </div>
                <div className="form-group my-3">
                    <input type="email" className="form-control" id="email" name="email" placeholder="Email address" required style={{ width: '20%' }} onChange={onChange} />
                </div>
                <div className="form-group my-3">
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" minLength={5} required style={{ width: '20%' }} onChange={onChange} />
                </div>
                <div className="form-group my-3">
                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" minLength={5} required style={{ width: '20%' }} onChange={onChange} />
                </div>
                {(credentials.password !== "" && credentials.confirmPassword !== "") ?
                    (passwordsMatch ?
                        <div className="my-2" style={{ color: 'green' }}>Passwords match</div> :
                        <div className="my-2" style={{ color: 'red' }}>Passwords do not match</div>
                    ) : <div className="my-5"></div>
                }
                <button disabled={!passwordsMatch} type="submit" className="btn btn-primary">Signup</button>
            </form>
            <a className='d-none' ref={loadHomePageRef} href='/'>This element when clicked loads home page</a>
        </div>
    )
}

export default Signup
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Header = (props) => {
    const location = useLocation().pathname
    const navigate = useNavigate()
    const onLogout = () => {
        // Todo: remove auth token from local storage and redirect to login page
        localStorage.removeItem('iNotebook-auth-token')
        navigate('/login')
        props.showAlert("success", "Logged Out Successfully !!")
    }
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location === '/' ? 'active' : ''}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location === '/about' ? 'active' : ''}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {location === '/' ?
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <div className="nav-link active" style={{cursor: "pointer"}} onClick={onLogout}>Logout</div>
                            </li>
                        </ul> :
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location === '/login' ? 'active' : ''}`} to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location === '/signup' ? 'active' : ''}`} to="/signup">Signup</Link>
                            </li>
                        </ul>
                    }


                </div>
            </div>
        </nav>
    )
}

export default Header
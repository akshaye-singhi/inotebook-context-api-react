import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Header from './components/Header';
import { NoteState } from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import NotFoundPage from './components/NotFoundPage';


const App = () => {
  const [alert, setAlert] = useState(null)
  const showAlert = (type, message) => {
    setAlert({type, message})
    setTimeout(() => {
      setAlert(null)
    }, "2000")
  }

  return (
    <NoteState>
      <BrowserRouter>
        <Header showAlert={showAlert}/>
        <Alert alert={alert} />
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert}/>} />
          <Route path="/login" element={<Login showAlert={showAlert}/>} />
          <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;

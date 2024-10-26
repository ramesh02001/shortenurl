import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import EmailForm from './components/AddUser';
// import EmailHistory from './components/dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import './App.css'
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ShortenUrl from './components/ShortenUrl';
import Redirect from './components/Redirect';


const App = () => {
    // const [Usernotes, setUsernotes] = useState([]);
// const Navigate=useNavigate()
   

    return (
        <div className="app-container">
          <Header/>
          <div className='app-container'>
          <Routes>
                
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route exact path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/dashboard" element={<Dashboard  />} />
                <Route path="/shorten" element={<ShortenUrl/>} />
                <Route path="/redirecturl/:shortUrl" element={<Redirect/>} />
          
                <Route path="/forgot-password" element={<ForgotPassword/>} /> 
                <Route path="/reset-password/:token" element={<ResetPassword />} /> 
            </Routes>

          </div>
           
        </div>
    );
};

export default App;
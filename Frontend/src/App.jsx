
import './App.css'
import Home from './pages/home/Home'
import React, { useState, useEffect } from 'react';
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import {Routes,Route, Navigate} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'
import SettingsModal from './components/profile/SettingsModal';


function App() {
  const {authUser} = useAuthContext();
  // const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  // const [theme, setTheme] = useState('light'); // default theme

  // useEffect(() => {
  //   // Get the theme from local storage or default to 'light'
  //   const savedTheme = localStorage.getItem('chat-setting');
  //   const initialTheme = savedTheme ? JSON.parse(savedTheme).theme : 'light';
  //   setTheme(initialTheme);
  //   document.body.className = initialTheme; // Apply theme class to body
  // }, []);

  // const handleThemeChange = (newTheme) => {
  //   setTheme(newTheme);
  //   document.body.className = newTheme; // Update body class on theme change
  // };


  return (
   <div className='p-4 h-screen flex items-center justify-center'>
    <Routes>
      <Route path='/' element={authUser  ?<Home/> :<Navigate to="/login"/> }/>
      <Route path='/login' element={authUser  ?<Navigate to="/"/> :<Login />}/>
      <Route path='/signup' element={authUser  ?<Navigate to="/"/> :<SignUp />}/>
    </Routes> 
    {/* <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onThemeChange={handleThemeChange} // Pass function to update theme
      /> */}
    <Toaster/>
</div>
  )
}

export default App

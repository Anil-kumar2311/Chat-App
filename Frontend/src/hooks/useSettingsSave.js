import React, { useState } from 'react'
// import { useAuthContext } from '../context/AuthContext';

const useSettingsSave = () => {
const [loading, setLoading] = useState(false);
// const {setAuthUser} = useAuthContext()

  const SettingsSave = async(theme) =>{
    setLoading(true)
    
    localStorage.setItem("chat-setting",JSON.stringify(theme))
    // setAuthUser()
    setLoading(false)
  }
  return {loading, SettingsSave}
}

export default useSettingsSave



import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import {Link} from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

const SignUp = () => {
  const [inputs,setInputs] =  useState({
    fullName :'',
    username : '',
    password : '',
    confirmpassword : '',
    gender : ''  
  }) 

  const {loading,signup} = useSignup()


  const handleCheckboxChange = (gender) => {
    setInputs({...inputs,gender})
  } 


  const handleSubmit = async (e) =>{
    e.preventDefault();

    const capitalizedFullName = inputs.fullName.charAt(0).toUpperCase() + inputs.fullName.slice(1);

    // Update the inputs with the capitalized fullName
    const updatedInputs = { ...inputs, fullName: capitalizedFullName };

    // Submit the updated inputs
    await signup(updatedInputs);

  }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>SignUp
          <span className='text-blue-500'> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base lable-text'>Fullname</span>
            </label>
            <input type='text' placeholder='Enter Fullname' className='w-full input input-bordered h-10' value={inputs.fullName} onChange={(e) => setInputs({...inputs,fullName:e.target.value})}/>
          </div>  
          <div>
            <label className='label p-2'>
              <span className='text-base lable-text'>Username</span>
            </label>
            <input type='text' placeholder='Enter Username' className='w-full input input-bordered h-10' value={inputs.username} onChange={(e) => setInputs({...inputs,username:e.target.value})}/>
          </div> 
          <div>
            <label className='label p-2'>
              <span className='text-base lable-text'>Password</span>
            </label>
            <input type='Password' placeholder='Enter Password' className='w-full input input-bordered h-10' value={inputs.password} onChange={(e) => setInputs({...inputs,password:e.target.value})}/>
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base lable-text'>Confirm Password</span>
            </label>
            <input type='Password' placeholder='Confirm Password' className='w-full input input-bordered h-10' value={inputs.confirmpassword} onChange={(e) => setInputs({...inputs,confirmpassword:e.target.value})}/>
          </div>
          <GenderCheckbox onCheckboxChange = {handleCheckboxChange} selectedGender={inputs.gender} />
          <Link to='/login' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>Already have an account?</Link>

          <div>
            <button className='btn btn-block btn-sm mt-2 border-slate-700' disabled={loading}>
              {loading ?<span className='loading loading-spinner'></span>:"Sign Up"}
            </button>
          </div>

        </form>
      
      </div>
    </div>
  )
}

export default SignUp
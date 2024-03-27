import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import {Label,TextInput, Button,Alert,Spinner} from "flowbite-react"
import { set } from 'mongoose'

function SignUp() {

  const [formData,setformData]= useState({})
  const[errorMessage,seterrorMessage]=useState(null);
  const [loading, setLoading] = useState(false)
  
  const handleChange = (e)=>{
    setformData({...formData,[e.target.id]:e.target.value.trim()})//states change only the fields that have been changed by user
  }
  console.log(formData);

  const navigate = useNavigate()
  const handleSubmit = async (e) =>{
    e.preventDefault();

    if(!formData.username || !formData.email|| !formData.email)
    {
      return seterrorMessage("Please fill all the fields")
    }
    try {

      setLoading(true)

      //clean previousrequest error
      seterrorMessage(null)

      const res = await fetch('/api/auth/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      })
      const data = await res.json()
      //basically checking if dup user exists or something like that in line39
      if(data.success === false){
        return seterrorMessage(data.message)
      }
      setLoading(false);

      //signup success then we move to login
      if(res.ok)
      {
        navigate('/signin')
      }
      
    } catch (error) {
      seterrorMessage(error.message)
      
    }

  }
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:gap-20">
        {/* left side */}
        <div className="flex-1">
          <Link
            to="/"
            className="  font-bold dark:text-white text-5xl"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-pink-500 via-blue-300 bg-indigo-600 rounded-lg text-white">
              Kiddos
            </span>
            Blog
          </Link>
          <p className='text-sm mt-5 overflow-auto'>
            This is a blog page for kiddos to come and Post WHat they have learnt 
            everyday so that it helps them to learn in public
          </p>
        </div>
        {/* Rigth side */}

        <div className="flex-1">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='' >
            <Label value='Your username' />
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleChange}
              />
            </div>
            <div className='' >
            <Label value='Email' />
              <TextInput
                type='email'
                placeholder='name@provider.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div className='' >
            <Label value='Password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {
                loading ? (
                  <>
                  <Spinner size='sm'/>
                  <span> Loading..</span>
                  </>
                  

                ) : "Signup"
              }
            </Button>
          </form>
          <div className='flex gap-2 flex-wrap text-sm mt-5'>
            <span>Have an Account!!?</span>
            <Link to ='/signin' className='text-blue-400'>/
            Sign In</Link>
          </div>

          {/* error handling */}
          {
            errorMessage &&(
              <Alert className="mt-4" color="failure">
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SignUp
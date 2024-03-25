import React from 'react'
import { Link } from 'react-router-dom'
import {Label,TextInput, Button} from "flowbite-react"

function SignUp() {
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
          <form className='flex flex-col gap-4'>
            <div className='' >
            <Label value='Your username' />
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
              />
            </div>
            <div className='' >
            <Label value='Email' />
              <TextInput
                type='text'
                placeholder='name@provider.com'
                id='email'
              />
            </div>
            <div className='' >
            <Label value='Password' />
              <TextInput
                type='text'
                placeholder='Password'
                id='password'
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
            >
              Sign up
            </Button>
          </form>
          <div className='flex gap-2 flex-wrap text-sm mt-5'>
            <span>Have an Account!!?</span>
            <Link to ='/signin' className='text-blue-400'>/
            Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
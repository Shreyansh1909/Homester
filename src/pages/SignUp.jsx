import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import { ReactComponent as visibilityIcon } from '../assets/svg/visibilityIcon.svg'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { db } from '../firebase.config'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import GAuth from '../Components/GAuth'
import { toast } from 'react-toastify'

function SignUp() {
  const [showPassword, setshowPassword] = useState(false)
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { name, email, password } = formData

  const handleChange = (e) => {
    setformData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name,
      })

      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy) //setDoc update database and add our user to user's collection

      navigate('/')
    } catch (error) {
      toast.error('Something went wrong with registration. Please retry')
    }
  }

  const navigate = useNavigate()
  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type='text'
            className='nameInput'
            placeholder='Name'
            value={name}
            id='name'
            onChange={handleChange}
          />
          <input
            type='email'
            className='emailInput'
            placeholder='Email'
            value={email}
            id='email'
            onChange={handleChange}
          />

          <div className='passwordInputDiv'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='passwordInput'
              placeholder='Password'
              id='password'
              valur={password}
              onChange={handleChange}
            />
            <img
              src={visibilityIcon}
              alt='Show Password'
              className='showPassword'
              onClick={() => setshowPassword((prev) => !prev)}
            />
          </div>
          <Link to='/forgot-password' className='forgotPasswordLink'>
            {' '}
            Forgot Password
          </Link>

          <div className='signUpBar'>
            <p className='signUpText'>Sign Up</p>
            <button className='signUpButton'>
              <ArrowRightIcon
                fill='#ffffff'
                width='34px'
                height='34px'
              ></ArrowRightIcon>
            </button>
          </div>
        </form>
        {/* Google Authentication */}
        <GAuth />

        <Link to='/sign-in' className='registerLink'>
          {' '}
          Sign In Instead
        </Link>
      </div>
    </>
  )
}

export default SignUp

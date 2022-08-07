import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import { ReactComponent as visibilityIcon } from '../assets/svg/visibilityIcon.svg'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import GAuth from '../Components/GAuth'
import { toast } from 'react-toastify'

function SignIn() {
  const [showPassword, setshowPassword] = useState(false)
  const [formData, setformData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const handleChange = (e) => {
    setformData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (userCredential.user) {
        navigate('/')
      }
    } catch (error) {
      toast.error("Bad User Credentiasl's")
    }
  }
  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back</p>
        </header>

        <form onSubmit={onSubmit}>
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
              alt=''
              className='showPassword'
              onClick={() => setshowPassword((prev) => !prev)}
            />
          </div>
          <Link to='/forgot-password' className='forgotPasswordLink'>
            {' '}
            Forgot Password
          </Link>

          <div className='signInBar'>
            <p className='signInText'>Sign In</p>
            <button className='signInButton'>
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

        <Link to='/sign-up' className='registerLink'>
          {' '}
          Sign Up Instead
        </Link>
      </div>
    </>
  )
}

export default SignIn

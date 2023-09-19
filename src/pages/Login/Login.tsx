import React, { FormEvent, useEffect, useState } from 'react'
import { useSession } from '@/hooks'

function initialFormValues() {
  return {
    email: '',
    password: ''
  }
}

function Login() {
  const [values, setValues] = useState(initialFormValues)
  const [loginRequestStatus, setLoginRequestStatus] = useState('success')
  const { signIn } = useSession()

  const users = [
    { name: 'Admin', email: 'admin@site.com', password: 'password@123' },
    { name: 'Client', email: 'client@site.com', password: 'password@123' }
  ]

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setValues({
      ...values,
      [name]: value
    })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    setLoginRequestStatus('loading')

    try {
      await signIn(values)
    } catch (error) {
      /**
       * an error handler can be added here
       */
    } finally {
      setLoginRequestStatus('success')
    }
  }

  useEffect(() => {
    // clean the function to prevent memory leak
    return () => setLoginRequestStatus('success')
  }, [])

  return (
    <div className="container">
      <div className="box">
        <div className="left">
          <div className="welcome">
            <h3>LMF | Light Finance.</h3>
            <p>Login to access the LMF Digital tools.</p>
          </div>
        </div>
        <div className="right">
          <form noValidate onSubmit={handleSubmit}>
            <h3 className="title">Login</h3>
            <div className="form-container">
              <input
                value={values.email}
                type="text"
                name="email"
                id="email"
                disabled={loginRequestStatus === 'loading'}
                onChange={handleChange}
                placeholder="User Email"
              />
              <input
                value={values.password}
                type="password"
                name="password"
                id="password"
                disabled={loginRequestStatus === 'loading'}
                onChange={handleChange}
                placeholder="Password"
              />

              <div className="login-btn">
                <button
                  type="submit"
                  disabled={loginRequestStatus === 'loading'}
                >
                  {loginRequestStatus === 'loading' ? 'Loading...' : 'Submit'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

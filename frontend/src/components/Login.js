import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    const auth = localStorage.getItem('user')
    if (auth) {
      navigate('/')
    }
  })
  const handleLogin = async () => {
    // console.log(email, password)

    axios
      .post('http://localhost:3000/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        // console.log(res.data.name)
        if (res.data.name) {
          localStorage.setItem('user', JSON.stringify(res))
          navigate('/')
        } else {
          alert('Enter correct details')
        }
      })
  }

  return (
    <div className="register">
      <h1 className="reg-head">Login</h1>
      <div className="input">
        <p>Email</p>
        <input
          className="inp-email"
          type="email"
          value={email}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          className="inp-pass"
          type="password"
          value={password}
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="btn" type="button">
          Login
        </button>
      </div>
    </div>
  )
}

export default Login

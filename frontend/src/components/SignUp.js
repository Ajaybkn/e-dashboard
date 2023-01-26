import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/SignUp.css'
const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    const auth = localStorage.getItem('user')
    if (auth) {
      navigate('/')
    }
  },[])
  const collectData = async () => {
    if (!name || !email || !password) {
      return false
    }
    console.log(name, email, password)
    axios
      .post('http://localhost:3000/register', {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res)
        //SAVING DATA IN LOCAL STORAGE-->>
        localStorage.setItem('user', JSON.stringify(res))
        if (res) {
          navigate('/')
        }
      })
  }
  return (
    <div className="register">
      <h1 className="reg-head">Register</h1>
      <div className="input">
        <p>Name</p>
        <input
          className="inp-name"
          type="text"
          placeholder="Enter Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <p>Email</p>
        <input
          className="inp-email"
          type="email"
          value={email}
          required
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          className="inp-pass"
          type="password"
          value={password}
          required
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn" type="button" onClick={collectData}>
          Sign up
        </button>
      </div>
    </div>
  )
}

export default SignUp

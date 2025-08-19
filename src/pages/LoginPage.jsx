import { useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";
import './Form.css'

function LoginPage(){
  const [formData,setFormData]=useState({
    email:'',
    password:'',
  })
  const navigate=useNavigate();
  const handleChange=(e)=>{
    const{name,value}=e.target;
    setFormData((prevState)=>({
      ...prevState,
      [name]:value,
    }))
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      const response=await axios.post('http://localhost:5000/api/auth/login',formData)
      localStorage.setItem('token',response.data.token);
      navigate('/')

    }catch(err){
      console.error('Error logging in',err.response.data);
      alert('Error logging in: '+err.response.data.message)

    }
  }
    return(
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label >Email</label>
            <input 
            type="email" 
            name="email"
            value={formData.email} 
            onChange={handleChange}
            required
            />
          </div>
          <div className="form-group">
            <label >Password</label>
            <input 
            type="password" 
            name="password"
            value={formData.password} 
            onChange={handleChange}
            required
            />
          </div>
          <button type="Submit">Login</button>
        </form>
      </div>
    )
  }


export default LoginPage
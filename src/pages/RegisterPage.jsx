import {useState} from 'react';
import axios from 'axios';
import './Form.css'
function RegisterPage(){
    // return <h1>Register Page</h1>
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:'',
    });
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData((prevState)=>({
            ...prevState,
            [name]:value
        }))
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const response=await axios.post('http://localhost:5000/api/auth/register',formData)
            console.log('Registration successful:',response.data)
            alert('Registration Successful!')
        }catch(err){
            console.error('There was an error registering:',err.response.data);
            alert('Error: '+err.response.data.message);
        }
    }
    return(
    <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label >Name</label>
                <input 
                type="text"
                name='name'
                value={formData.name}
                onChange={handleChange} 
                required 
                />
            </div>
            <div className='form-group'>
                <label >Email</label>
                <input 
                type="email"
                name='email'
                value={formData.email}
                onChange={handleChange} 
                required 
                />
            </div>
            <div className='form-group'>
                <label >Password</label>
                <input 
                type="password"
                name='password'
                value={formData.password}
                onChange={handleChange} 
                required 
                />
            </div>
            <button type='submit'>Register</button>
        </form>
    </div>
)}

export default RegisterPage
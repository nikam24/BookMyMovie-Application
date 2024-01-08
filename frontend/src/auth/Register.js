import React, { useState } from 'react';
import Auth from './Auth';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Auth.register(email, password).then(() => {
      alert('User registered successfully!');
      sendEmail(name, email);
      navigate('/login');
    })
    .catch((err) => {
      alert('User already exists!');
    });
  };

  const sendEmail = async () => {
    try {
      console.log('Sending registered email to the server...');
      const res = await axios.post('http://localhost:5000/send', { name, email });

      if (res.status === 200) {
        console.log('Email sent successfully!');
      }
      else {
        console.log('Error sending email: ' + res.statusText)
      }
    } catch (error) {
      console.log('Error sending email: ' + error);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gradient-to-r from-yellow-500 to-orange-500'>
      <div className='w-full max-w-md'>
        <form className='p-8 rounded-md bg-white shadow-lg' onSubmit={handleSubmit}>
          <h2 className='text-center font-bold text-xl mb-8'>Register</h2>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
              Full Name
            </label>
            <input
              type='text'
              id='fullname'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              value={name}
              placeholder='Jonas Michael Kahnwald'
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
              Email
            </label>
            <input
              type='email'
              id='email'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              value={email}
              placeholder='johnas@gmail.com'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
              Password
            </label>
            <input
              type='password'
              id='password'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              value={password}
              placeholder='********'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type='submit'
            className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Register
          </button>

          <div className='mt-8 text-center'>
            <Link to='/login' className='text-sm text-gray-700 hover:text-yellow-700'>
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

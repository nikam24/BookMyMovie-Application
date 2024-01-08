import React, { useState } from 'react';
import Auth from './Auth';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sign in the user with Firebase
    await Auth.login(email, password).then(() => {
      alert('Logged in successfully!');
      navigate('/homepage');
    })
    .catch((err) => { alert('Invalid credentials!'); });

  };

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-cyan-500'>
      <div className='w-full max-w-md'>
        <form className='p-8 rounded-md bg-white shadow-lg' onSubmit={handleSubmit}>
          <h2 className='text-center font-bold text-xl mb-8'>Login</h2>

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
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Login
          </button>

          <div className='mt-8 text-center'>
            <Link to='/' className='text-sm text-gray-700 hover:text-blue-700'>
              Don't have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

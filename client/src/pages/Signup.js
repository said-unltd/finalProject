import { useState } from 'react';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../store/authSlice';
import { Navigate } from 'react-router-dom';

const Signup = () => {

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [user, setUser] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault();
    // axios.post('http://localhost:8080/signup', { username, name, surname, position, email, password })
    dispatch(signup({username, name, surname, email, password}))
    .then((res) => {
      setUsername('');
      setPassword('');
      setName('');
      setSurname('');
      setEmail('');
      // setUser(res.data.username)
    })
  }; 

  return (
    <div>
      
      <form className='mx-auto border-2 p-9 md:p-12 w-72 md:w-96 border-yellow-400 mt-36 h-84 mb-36' onSubmit={submitHandler}>
        <h3 className='pb-6 text-2xl text-center text-white'>Sign Up</h3>
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='username'>Username</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='name'>Name</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='surname'>Surname</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='surname' type='text' value={surname} onChange={(e) => setSurname(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='email'>Email</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='email' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='password'>Password</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className='flex justify-between'>
          <button className='px-3 py-1 rounded-sm bg-yellow-400' type='button'>Cancel</button>
          <button className='px-3 py-1 rounded-sm bg-yellow-400' type='submit'>Submit</button>
        </div>
        { error ? <p className='pt-10 text-center text-red-600'>{error}</p> : null }
        { user ? <Navigate to='/profile' replace={true} /> : null}
      </form>
    </div>
  );
};

export default Signup;
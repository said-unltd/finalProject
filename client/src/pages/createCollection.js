import { useEffect, useState } from 'react';
import axios from 'axios';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createCollection } from '../store/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';

const CreateCollection = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = useSelector((state) => state.auth.userId);
  console.log("result of userID", userId);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  let navigate = useNavigate();


//   const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
//   const [password, setPassword] = useState('');
  // const [user, setUser] = useState(null);
  const [string1State, setString1State] = useState(false);
  const [string1Name, setString1Name] = useState('');
  const [string2State, setString2State] = useState(false);
  const [string2Name, setString2Name] = useState('');
  const [string3State, setString3State] = useState(false);
  const [string3Name, setString3Name] = useState(''); 

  const [int1State, setInt1State] = useState(false);
  const [int1Name, setInt1Name] = useState(undefined);
  const [int2State, setInt2State] = useState(false);
  const [int2Name, setInt2Name] = useState(undefined);
  const [int3State, setInt3State] = useState(false);
  const [int3Name, setInt3Name] = useState(undefined);

  const [description1State, setDescription1State] = useState(false);
  const [description1Name, setDescription1Name] = useState('');
  const [description2State, setDescription2State] = useState(false);
  const [description2Name, setDescription2Name] = useState('');
  const [description3State, setDescription3State] = useState(false);
  const [description3Name, setDescription3Name] = useState('');

  const [bool1State, setBool1State] = useState(false);
  const [bool1Name, setBool1Name] = useState('');
  const [bool2State, setBool2State] = useState(false);
  const [bool2Name, setBool2Name] = useState('');
  const [bool3State, setBool3State] = useState(false);
  const [bool3Name, setBool3Name] = useState('');

  const [date1State, setDate1State] = useState(false);
  const [date1Name, setDate1Name] = useState('');
  const [date2State, setDate2State] = useState(false);
  const [date2Name, setDate2Name] = useState('');
  const [date3State, setDate3State] = useState(false);
  const [date3Name, setDate3Name] = useState('');
  

//   const [string1, setString1] = useState('');
//   const [string2, setString2] = useState('');
//   const [string3, setString3] = useState('');
//   const [int1, setInt1] = useState('');
//   const [int2, setInt2] = useState('');
//   const [int3, setInt3] = useState('');
//   const [description1, setDescription1] = useState('');
//   const [description2, setDescription2] = useState('');
//   const [description3, setDescription3] = useState('');
//   const [date1, setDate1] = useState('');
//   const [date2, setDate2] = useState('');
//   const [date3, setDate3] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user', user)
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('string1Name', string1Name);
    formData.append('string2Name', string2Name);
    formData.append('string3Name', string3Name);
    formData.append('int1Name', int1Name);
    formData.append('int2Name', int2Name);
    formData.append('int3Name', int3Name);
    formData.append('description1Name', description1Name);
    formData.append('description2Name', description2Name);
    formData.append('description3Name', description3Name);
    formData.append('bool1Name', bool1Name);
    formData.append('bool2Name', bool2Name);
    formData.append('bool3Name', bool3Name);
    formData.append('date1Name', date1Name);
    formData.append('date2Name', date2Name);
    formData.append('date3Name', date3Name);


    // axios.post('http://localhost:8080/signup', { username, name, description, position, email, password })
    dispatch(createCollection({ user, userId, name, description, image, string1State, string1Name, string2State, string2Name, string3State, string3Name, int1State, int1Name, int2State, int2Name, int3State, int3Name, description1State, description1Name, description2State, description2Name, description3State, description3Name, bool1State, bool1Name, bool2State, bool2Name, bool3State, bool3Name, date1State, date1Name, date2State, date2Name, date3State, date3Name, formData }))
    .then((res) => {
    //   setUsername('');
    //   setPassword('');
      setName('');
      setDescription('');
      setImage('');
      // setUser(res.data.username)
    })

    navigate('/collection');
  }; 

  return (
    <div>
      
      <form className='mx-auto border-2 p-9 md:p-12 w-72 md:w-96 border-yellow-400 mt-36 h-84 mb-36' onSubmit={submitHandler}>
        <h3 className='pb-6 text-2xl text-center text-white'>Add Item</h3>
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='name'>Name</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='description'>Description</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='description' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />

        <label className='block mb-1 text-xl text-yellow-400' htmlFor='image'>Upload Image Here:</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='image' type='file' name='image' files={image} onChange={(e) => setImage(e.target.files[0])} required/>

        <label className='block mb-1 text-xl text-yellow-400' htmlFor='string1name'>String 1 Name</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='string1name' type='text' value={string1Name} onChange={(e) => setString1Name(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='string2name'>String 2 Name</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='string2name' type='text' value={string2Name} onChange={(e) => setString2Name(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='string3name'>String 3 Name</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='string3name' type='text' value={string3Name} onChange={(e) => setString3Name(e.target.value)} />

        <label className='block mb-1 text-xl text-yellow-400' htmlFor='int1name'>Integer 1 Name</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='int1name' type='text' value={int1Name} onChange={(e) => setInt1Name(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='int2name'>Integer 2 Name</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='int2name' type='text' value={int2Name} onChange={(e) => setInt2Name(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='int3name'>Integer 3 Name</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='int3name' type='text' value={int3Name} onChange={(e) => setInt3Name(e.target.value)} />

        <label className='block mb-1 text-xl text-yellow-400' htmlFor='description1name'>Description 1 Name</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='description1name' type='text' value={description1Name} onChange={(e) => setDescription1Name(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='description2name'>Description 2 Name</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='description2name' type='text' value={description2Name} onChange={(e) => setDescription2Name(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='description3name'>Description 3 Name</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='description3name' type='text' value={description3Name} onChange={(e) => setDescription3Name(e.target.value)} />

        <label className='block mb-1 text-xl text-yellow-400' htmlFor='boolean1name'>Boolean 1 Name</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='boolean1name' type='text' value={bool1Name} onChange={(e) => setBool1Name(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='boolean2name'>Boolean 2 Name</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='boolean2name' type='text' value={bool2Name} onChange={(e) => setBool2Name(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='boolean3name'>Boolean 3 Name</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='boolean4name' type='text' value={bool3Name} onChange={(e) => setBool3Name(e.target.value)} />

        <label className='block mb-1 text-xl text-yellow-400' htmlFor='date1name'>Date 1 Name</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='date1name' type='text' value={date1Name} onChange={(e) => setDate1Name(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='date2name'>Date 2 Name</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='date2name' type='text' value={date2Name} onChange={(e) => setDate2Name(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='date3name'>Date 3 Name</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='date3name' type='text' value={date3Name} onChange={(e) => setDate3Name(e.target.value)} />

        <div className='flex justify-between'>
          <button className='px-3 py-1 rounded-sm bg-yellow-400' type='button'>Cancel</button>
          <button className='px-3 py-1 rounded-sm bg-yellow-400' type='submit'>Submit</button>
        </div>
        { error ? <p className='pt-10 text-center text-red-600'>{error}</p> : null }
        { !user ? <Navigate to='/profile' replace={true} /> : null}
      </form>
    </div>
  );
};

export default CreateCollection;
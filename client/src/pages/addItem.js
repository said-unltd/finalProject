import { useEffect, useState } from 'react';
import axios from 'axios';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';


const AddItem = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = useSelector((state) => state.auth.userId);
  const collectionId = useSelector((state) => state.auth.currentCollection);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch()
  let navigate = useNavigate();

//   const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');
//   const [password, setPassword] = useState('');
  // const [user, setUser] = useState(null);
  const [string1, setString1] = useState('');
  const [string2, setString2] = useState('');
  const [string3, setString3] = useState('');
  const [int1, setInt1] = useState('');
  const [int2, setInt2] = useState('');
  const [int3, setInt3] = useState('');
  const [description1, setDescription1] = useState('');
  const [description2, setDescription2] = useState('');
  const [description3, setDescription3] = useState('');
  const [bool1, setBool1] = useState(false);
  const [bool2, setBool2] = useState(false);
  const [bool3, setBool3] = useState(false);
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [date3, setDate3] = useState('');

  console.log("THIS IS COLLECTION ID IN ITEM COMPONENT", collectionId);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user', user)
    formData.append('name', name);
    formData.append('description', description);
    formData.append('file', file);
    formData.append('string1', string1);
    formData.append('string2', string2);
    formData.append('string3', string3);
    formData.append('int1', int1);
    formData.append('int2', int2);
    formData.append('int3', int3);
    formData.append('description1', description1);
    formData.append('description2', description2);
    formData.append('description3', description3);
    formData.append('bool1', bool1);
    formData.append('bool2', bool2);
    formData.append('bool3', bool3);
    formData.append('date1', date1);
    formData.append('date2', date2);
    formData.append('date3', date3);

    console.log("THIS IS COLLECTION ID IN ITEM COMPONENT", collectionId);

    // axios.post('http://localhost:8080/signup', { username, name, description, position, email, password })
    dispatch(addItem({ collectionId, user, userId, name, description, file, formData }))
    .then((res) => {
    //   setUsername('');
    //   setPassword('');
      setName('');
      setDescription('');
      setFile('');
      // setUser(res.data.username)
    })
    navigate('/collection/items');
  }; 

  return (
    <div>
      
      <form className='mx-auto border-2 p-9 md:p-12 w-72 md:w-96 border-yellow-400 mt-36 h-84 mb-36' onSubmit={submitHandler}>
        <h3 className='pb-6 text-2xl text-center text-white'>Add Item</h3>
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='name'>Name</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='description'>Description</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='description' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />

        <label className='block mb-1 text-xl text-yellow-400' htmlFor='file'>Upload File Here:</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='file' type='file' name='file' files={file} onChange={(e) => setFile(e.target.files[0])} required/>

        <label className='block mb-1 text-xl text-yellow-400' htmlFor='string1'>String 1</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='string1' type='text' value={string1} onChange={(e) => setString1(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='string2'>String 2</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='string2' type='text' value={string2} onChange={(e) => setString2(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='string3'>String 3</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='string3' type='text' value={string3} onChange={(e) => setString3(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='int1'>Integer 1</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='int1' type='text' value={int1} onChange={(e) => setInt1(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='int2'>Integer 2</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='int2' type='text' value={int2} onChange={(e) => setInt2(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='int3'>Integer 3</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='int3' type='text' value={int3} onChange={(e) => setInt3(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='description1'>Description 1</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='description1' type='text' value={description1} onChange={(e) => setDescription1(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='description2'>Description 2</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='description2' type='text' value={description2} onChange={(e) => setDescription2(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='description3'>Description 3</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='description3' type='text' value={description3} onChange={(e) => setDescription3(e.target.value)} />
        
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='bool1'>Bool 1</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='bool1' type='text' onChange={(e) => setBool1(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='bool2'>Bool 2</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='bool2' type='text' onChange={(e) => setBool2(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='bool3'>Bool 3</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='bool3' type='text' onChange={(e) => setBool3(e.target.value)} />

        <label className='block mb-1 text-xl text-yellow-400' htmlFor='date1'>Date 1</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='date1' type='text' value={date1} onChange={(e) => setDate1(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='date2'>Date 2</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='date2' type='text' value={date2} onChange={(e) => setDate2(e.target.value)} />
        <label className='block mb-1 text-xl text-yellow-400' htmlFor='date3'>Date 3</label>
        <input className='w-full h-8 p-1 mb-6 focus:outline-none' id='date3' type='text' value={date3} onChange={(e) => setDate3(e.target.value)} />

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

export default AddItem;
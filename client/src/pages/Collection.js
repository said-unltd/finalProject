import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { setCurrentCollection } from '../store/authSlice';
// import folderimage from '../assets/folderimage.svg';
// import { Foldersvg } from '../component/Foldersvg';

const Collection = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const currentCollID = useSelector((state) => state.auth.currentCollection);
    const userId = useSelector((state) => state.auth.userId);
    // console.log(userId);
    const username = useSelector((state) => state.auth.user);
    const [users, setUsers] = useState([]);
    const [collections, setCollections] = useState([]);
    const [pressedCollectionId, setPressedCollectionId] = useState(undefined);
    const [error, setError] = useState(null);
    const [currentCollectionId, setCurrentCollectionId] = useState(undefined);
    

    useEffect(() => {
        axios.get('http://localhost:8080/collection', {params: {username, userId}})
        .then(res => {
            let collections = [];
            // console.log(res.data);
            res.data.forEach(collection => collections.push(collection))
            setCollections(collections);
            setError(null)
        })
        .catch(err => setError('Could not fetch Collection 🤪'))
    }, [username, userId])

    const setCurrentCollectionHandler = (collId) => {
        // e.preventDefault();
        setCurrentCollectionId(collId);
        // console.log("SAVED", currentCollectionId);
        // console.log("CLICKED", collId);
        dispatch(setCurrentCollection(collId));
        // console.log("OK THIS IS LIKE CURRENT COLL ID", currentCollID);
        // <Navigate to='/collection/items' replace={true} />
        // .then(() => {
        //   setUsername('');
        //   setPassword('');
        // })
      }; 

    return (
        <div>
            {/* <img src={folderimage} alt='' /> */}
            { !user ? 
                <Navigate to='/' replace={true} /> 
                :
                <div className="mx-20 border p-9 md:p-12 w-72 md:w-96 border-yellow-400 h-84">
                    <div className='flex'>
                        <h1 className="text-xl font-medium text-yellow-400">{user}'s Collection</h1>
                    </div>
                    <hr className="" />
                    <div className='flex mt-3'>
                        {collections.map((collection, i) => {
                            return (
                                <div className='flex border pl-5 pr-5 pb-10 pt-3 m-5 border-cyan-400 hover:cursor-pointer' key={collection.collection_id} onClick={() => {setCurrentCollectionHandler(collection.collection_id)}}>
                                    {/* <input className='mr-3' type='checkbox' /> */}
                                    <div className="text-lg text-white w-fit hover:cursor-pointer" key={i}>{collection.name}</div>
                                    {/* <div className="text-lg text-white w-fit hover:cursor-pointer" key={i}>{collection.description}</div> */}
                                    <Link to='/collection/items' className="text-xl text-white">View</Link>
                                </div>
                                
                                
                            )
                        })}
                    
                        { error ? <p className='pt-10 text-center text-red-600'>{error}</p> : null }
                    </div>
                    <Link className="text-xl text-white" to='/createcollection'>Create Collection</Link>
                </div> 
            }
        </div>
    )
}

export default Collection;
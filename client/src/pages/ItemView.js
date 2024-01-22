import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import folderimage from '../assets/folderimage.svg';
// import { Foldersvg } from '../component/Foldersvg';

const ItemView = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const currentCollID = useSelector((state) => state.auth.currentCollection);
    const userId = useSelector((state) => state.auth.userId);
    const currentItemId = useSelector((state) => state.auth.itemViewId);
    const navigate = useNavigate();
    console.log("INSIDE ITEM VIEW: ", currentItemId);
    const username = useSelector((state) => state.auth.user);
    const [users, setUsers] = useState([]);
    const [collections, setCollections] = useState([]);
    const [pressedCollectionId, setPressedCollectionId] = useState(undefined);
    const [error, setError] = useState(null);
    const [currentCollectionId, setCurrentCollectionId] = useState(undefined);
    

    useEffect(() => {
        axios.get('http://localhost:8080/collection/items/view', {params: {username, userId, currentItemId}})
        .then(res => {
            let collections = [];
            // console.log(res.data);
            res.data.forEach(collection => collections.push(collection))
            setCollections(collections);
            setError(null)
        })
        .catch(err => setError('Could not fetch Collection 🤪'))
    }, [username, userId])

    // const setCurrentCollectionHandler = (collId) => {
    //     // e.preventDefault();
    //     setCurrentCollectionId(collId);
    //     console.log("SAVED", currentCollectionId);
    //     console.log("CLICKED", collId);
    //     dispatch(setCurrentCollection(collId));
    //     console.log("OK THIS IS LIKE CURRENT COLL ID", currentCollID);
    //     <Navigate to='/collection/items' replace={true} />
    //     // .then(() => {
    //     //   setUsername('');
    //     //   setPassword('');
    //     // })
    //   }; 

    return (
        <div>
            {/* <img src={folderimage} alt='' /> */}
            { !user ? 
                <Navigate to='/' replace={true} /> 
                :
                <div className="mx-20 border p-9 md:p-12 w-72 md:w-96 border-yellow-400 h-84">
                    <div className='flex'>
                        <h1 className="text-xl font-medium text-yellow-400">{user}'s Item View Page</h1>
                    </div>
                    <hr className="" />
                    <div className='flex mt-3'>
                        {collections.map((collection, i) => {
                            return (
                                <div className='flex flex-col border pl-5 pr-5 pb-10 pt-3 m-5 border-cyan-400 hover:cursor-pointer' key={collection.collection_id} >
                                    {/* <input className='mr-3' type='checkbox' /> */}
                                    <div className="text-lg text-white w-fit hover:cursor-pointer mb-2" key={i}>Name: {collection.name}</div>
                                    <div className="text-lg text-white w-fit hover:cursor-pointer mb-2" key={i+1}>Description: {collection.description}</div>
                                    {/* <div className="text-lg text-white w-fit hover:cursor-pointer" key={i}>{collection.description}</div> */}
                                </div>
                                
                                
                            )
                        })}
                    
                        { error ? <p className='pt-10 text-center text-red-600'>{error}</p> : null }
                    </div>
                </div> 
            }
        </div>
    )
}

export default ItemView;
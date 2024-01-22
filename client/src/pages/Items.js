import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom"
import { setItemViewId } from '../store/authSlice';


const Items = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user)
    const userId = useSelector((state) => state.auth.userId);
    const collectionID = useSelector((state) => state.auth.currentCollection);
    console.log(collectionID);
    // console.log(userId);
    const username = useSelector((state) => state.auth.user);
    const [users, setUsers] = useState([]);
    const [collection, setCollections] = useState([]);
    const [error, setError] = useState(null);
    const [currentItemViewId, setCurrentItemViewId] = useState(undefined);
    const currentItemId = useSelector((state) => state.auth.itemViewId);

    useEffect(() => {
        axios.get('http://localhost:8080/collection/items', {params: {username, userId, collectionID}})
        .then(res => {
            let collections = [];
            console.log(res.data);
            res.data.forEach(collection => collections.push(collection))
            setCollections(collections);
            setError(null)
        })
        .catch(err => setError('Could not fetch item 🤪'))
    }, [username, userId])

    const setCurrentItemId = (itemId) => {
        // e.preventDefault();
        setCurrentItemViewId(itemId);
        console.log("SAVED, ITEM ID: ", currentItemViewId);
        console.log("CLICKED, ITEM ID:", itemId);
        dispatch(setItemViewId(itemId));
        console.log("OK THIS IS LIKE CURRENT ITEM ID", currentItemId);
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
                        <h1 className="text-xl font-medium text-yellow-400">Items of {user}'s' Collection </h1>
                    </div>
                    <hr className="" />
                    <div className='flex mt-3'>
                        {collection.map((collection, i) => {
                            return (
                                <div className='flex border pl-5 pr-5 pb-10 pt-3 m-5 border-cyan-400' key={i} onClick={() => setCurrentItemId(collection.item_id)}>
                                    {/* <input className='mr-3' type='checkbox' /> */}
                                    <div className="text-lg text-white w-fit hover:cursor-pointer" key={i}>{collection.name}</div>
                                    <Link to='/collection/items/view' className="text-xl text-white">View</Link>
                                </div>
                            )
                        })}
                    
                        { error ? <p className='pt-10 text-center text-red-600'>{error}</p> : null }
                    </div>
                    <Link className="text-xl text-white" to='/addItem'>Add Item</Link>
                </div> 
            }
        </div>
    )
}

export default Items;
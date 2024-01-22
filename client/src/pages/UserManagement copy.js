import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Navigate } from "react-router-dom";

const UserManagement = () => {
    const user = useSelector((state) => state.auth.user)
    const username = useSelector((state) => state.auth.user);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/usermanagement', {params: {username}})
        .then(res => {
            let usernames = [];
            console.log(res.data);
            res.data.forEach(user => usernames.push(user))
            setUsers(usernames);
            setError(null)
        })
        .catch(err => setError('Could not fetch user 🤪'))
    }, [username])

    return (
        <div>
            { !user ? 
                <Navigate to='/' replace={true} /> 
                :
                <div className="ml-10">
                    <div className='flex'>
                        <input className='mr-3' type='checkbox'/>
                        <h1 className="text-xl font-medium text-yellow-400 mr-20">Users</h1>
                        <h1 className="text-xl font-medium text-yellow-400 mr-20 ml-10">Name</h1>
                        <h1 className="text-xl font-medium text-yellow-400 mr-20 ml-10">Surname</h1>
                        <h1 className="text-xl font-medium text-yellow-400 mr-20 ml-10">Email</h1>
                        <h1 className="text-xl font-medium text-yellow-400 mr-20 ml-10">Last Login</h1>
                        <h1 className="text-xl font-medium text-yellow-400 mr-20 ml-10">Status</h1>
                        <h1 className="text-xl font-medium text-yellow-400 mr-20 ml-10">Role</h1>
                    </div>
                    <hr className="mb-3" />
                    <ul>
                        {users.map((user, i) => {
                            return (
                                <div className='flex'>
                                    <div className='container flex mr-10'>
                                        <input className='mr-3' type='checkbox' key={i+1} name={user.username} />
                                        <li className="text-lg text-white w-fit hover:cursor-pointer" key={i}>{user.username}</li>
                                    </div>
                                    <div className='container flex mr-10'>
                                        <li className="text-lg text-white w-fit hover:cursor-pointer" key={i}>{user.name}</li>
                                    </div>
                                    <div className='container flex mr-10'>
                                        <li className="text-lg text-white w-fit hover:cursor-pointer" key={i}>{user.surname}</li>
                                    </div>
                                    <div className='container flex mr-10'>
                                        <li className="text-lg text-white w-fit hover:cursor-pointer" key={i}>{user.email}</li>
                                    </div>
                                    <div className='container flex mr-10 h-100'>
                                        <li className="text-lg text-white w-fit hover:cursor-pointer" key={i}>{user.last_login}</li>
                                    </div>
                                    <div className='container flex mr-10'>
                                        <li className="text-lg text-white w-fit hover:cursor-pointer" key={i}>{user.status}</li>
                                    </div>
                                    <div className='container flex mr-10'>
                                        <li className="text-lg text-white w-fit hover:cursor-pointer" key={i}>{user.role}</li>
                                    </div>
                                    <hr className="mb-3" />
                                </div>
                            )
                        })}
                        { error ? <p className='pt-10 text-center text-red-600'>{error}</p> : null }
                    </ul>
                </div>
            }
        </div>
    )
}

export default UserManagement;
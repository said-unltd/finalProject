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

    const handleCheck = (e) => {
        const { name, checked } = e.target;
        if (name === 'allSelection') {
            let tempUser = users.map((user) => {
                return {...user, isChecked : checked }
            });
            setUsers(tempUser);
        } else {
            let tempUser = users.map((user) => 
                user.username === name ? {...user, isChecked: checked } : user
            );
            setUsers(tempUser);
        }
    }

    return (
        <div>
            { !user ? 
                <Navigate to='/' replace={true} /> 
                :
                <div className="table w-full ml-10">
                    <div className='table-header-group flex justify-content'>
                        <div className="table-row flex">
                            <div className="table-cell text-left">
                                <input className='mr-3' type='checkbox' name='allSelection' onChange={handleCheck} checked={users.filter(user => user?.isChecked !== true).length < 1 } />   
                            </div>
                            <div className='table-cell text-left'>
                                <h1 className="text-xl font-medium text-yellow-400">Users</h1>
                            </div>
                            <div className="table-cell text-left">
                                <h1 className="text-xl font-medium text-yellow-400">Name</h1>
                            </div>
                            <div className="table-cell text-left">
                                <h1 className="text-xl font-medium text-yellow-400">Surname</h1>
                            </div>
                            <div className="table-cell text-left">
                                <h1 className="text-xl font-medium text-yellow-400">Email</h1>
                            </div>
                            <div className="table-cell text-left">
                                <h1 className="text-xl font-medium text-yellow-400">Last Login</h1>
                            </div>
                            <div className="table-cell text-left">
                                <h1 className="text-xl font-medium text-yellow-400">Status</h1>
                            </div>
                            <div className="table-cell text-left">
                                <h1 className="text-xl font-medium text-yellow-400">Role</h1>
                            </div>
                        </div>
                    </div>
                    <div className='table-row-group'>
                    {/* <hr className="mb-3" /> */}
                    {/* <ul> */}
                        {users.map((user, i) => {
                            return (
                                <div className='table-row flex'>
                                    <div className='table-cell'>
                                        <input className='mr-3' type='checkbox' key={i+1} name={user.username} checked={user?.isChecked || false} onChange={handleCheck} />
                                    </div>
                                    <div className='table-cell'>
                                        <div className="text-lg text-white w-fit hover:cursor-pointer" key={i}>{user.username}</div>
                                    </div>
                                    <div className='table-cell'>
                                        <div className="text-lg text-white w-fit hover:cursor-pointer" key={i}>{user.name}</div>
                                    </div>
                                    <div className='table-cell'>
                                        <div className="text-lg text-white w-fit hover:cursor-pointer" key={i}>{user.surname}</div>
                                    </div>
                                    <div className='table-cell'>
                                        <div className="text-lg text-white w-fit hover:cursor-pointer" key={i}>{user.email}</div>
                                    </div>
                                    <div className='table-cell flex h-100'>
                                        <div className="text-lg text-white w-fit hover:cursor-pointer" key={i}>{user.last_login}</div>
                                    </div>
                                    <div className='table-cell'>
                                        <div className="text-lg text-white w-fit hover:cursor-pointer" key={i}>{user.status}</div>
                                    </div>
                                    <div className='table-cell'>
                                        <div className="text-lg text-white w-fit hover:cursor-pointer" key={i}>{user.role}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    { error ? <p className='pt-10 text-center text-red-600'>{error}</p> : null }
                    {/* </ul> */}
                </div>
            }
        </div>
    )
}

export default UserManagement;
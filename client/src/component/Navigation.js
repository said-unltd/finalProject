import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

export default function Navigation() {
    const loggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    return (
        <nav className='flex items-center justify-between w-full h-16 py-2 text-white border-b px-28 mb-10 border-yellow-400'>
            <Link to='/' className="text-2xl font-medium text-white">
                <span className="text-yellow-400">T</span>reasure
            </Link>
            { loggedIn ?  
                <ul className="flex items-center h16 text-xl">
                    <li><Link className="pl-20" to='/usermanagement'>User Management</Link></li>
                    <li><Link className="pl-20" to='/collection'>My Collection</Link></li>
                    <li><Link className="pl-20" to='/profile'>Profile</Link></li>
                    <li className="pl-20"><Link to='/' onClick={() => dispatch(logout())}>Log out</Link></li>
                </ul>
                :
                <ul className="flex items-center h16 text-xl">
                    <li><Link to='/signup'>Sing Up</Link></li>
                    <li className="pl-20"><Link to='/signin'>Sing In</Link></li>
                </ul>
            }
        </nav>
    )
}
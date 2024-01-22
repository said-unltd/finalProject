// import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Profile() {
    // const location = useLocation();

    const user = useSelector((state) => state.auth.user)
    return (
        <div>
            { !user ? 
                <Navigate to='/' replace={true} /> 
                :
                <div>
                    <h3 className="pb-6 text-2xl text-center text-white">Profile</h3>
                    <h4 className="text-xl text-center text-white">Hi, {user}!</h4>
                </div>
            }
        </div>
    )
}

export default Profile;
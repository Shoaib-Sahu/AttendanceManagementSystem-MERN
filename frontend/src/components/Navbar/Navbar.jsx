import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../actions/authAction';
import './Navbar.css'

const Navbar = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <div className='nav'>
            <div className="nav-l">
                <h4>Attendance Management System</h4>
            </div>
            <div className="nav-r">
                <button
                    onClick={handleLogout}
                    className='logoutBtn'>Logout</button>
            </div>
        </div>
    )
}

export default Navbar
import React from 'react';
import Navbar from '../components/navbar/navbar';
import { useAuth } from '../context/AuthContext';

import { FaUserCircle } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { SiOpensourceinitiative } from "react-icons/si";

import '../styles/UserStyles.css'


const UserPage = () => {

    const { user } = useAuth();

    return (
        <>
            <Navbar />
            <section className='Layout'>
                <div className='userDiv'>
                    <div  className='imgUser' style={{ backgroundImage: `url('http://localhost:3000/${user.avatar}')` }}>
                        {/* Here IMG in CSS */}
                    </div>
                    <h2 className='userName'><b><FaUserCircle /></b>{user.username}</h2>
                    <hr/>
                    <h2 className='userEmail'><b><MdAlternateEmail /></b>{user.email}</h2>
                    <hr/>
                    <h2 className='userEmail'><b><SiOpensourceinitiative /></b>{user.cc}</h2>
                    <hr/>
                </div>
            </section>
        </>
    );
}

export default UserPage;

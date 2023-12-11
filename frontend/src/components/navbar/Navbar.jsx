import React from 'react';
import { logout } from '../../api/auth';
import { Link, useNavigate } from 'react-router-dom'
import GotaNav from '../../assets/GotaNav.png'

// TODO Icons

import { FaRegCalendarMinus, FaMoneyCheckDollar, FaCcPaypal } from "react-icons/fa6";
import { FaHome, FaUser } from "react-icons/fa";
import { GrConfigure } from "react-icons/gr";
import { MdMedicalInformation } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";

import '../../styles/NavBar.css';

const Navbar = () => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/home')
    }
    return (
        <nav>
            <li>
                <img onClick={handleClick} src={GotaNav} width={'120px'} style={{margin: 'auto', cursor: 'pointer' }} />
            </li>
            <li>
                <Link to={'/home'}><FaHome />Panel</Link>
            </li>
            <li>
                <Link to={'/user'}><FaUser />Usuario</Link>
            </li>
            <li>
                <Link to={'/medidorPage'}><FaRegCalendarMinus />Medidores</Link>
            </li>
            <li>
                <Link to={'/reportes'}><MdMedicalInformation />Reportes</Link>
            </li>
            <li>
                <Link to={'/facturas'}><FaMoneyCheckDollar />Facturas</Link>
            </li>
            {/* <li>
                <Link to={'/pagos'}><FaCcPaypal />Pagos</Link>
            </li> */}
            <hr/>
            <li>
                <Link to={'/config'}><GrConfigure />Configuracion</Link>
            </li>
            <form className='navForm'>
                <button type='submit' onClick={logout}><RiLogoutBoxFill />Cerrar Sesion</button>
            </form>
        </nav>
    );
}

export default Navbar;

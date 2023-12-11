import React, { useState } from 'react';
import Navbar from '../components/navbar/navbar';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaUser } from "react-icons/fa";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/configStyles.css'

const ConfigPage = () => {

    const { user } = useAuth()

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        avatar: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setUserData((prevData) => ({
            ...prevData,
            avatar: file,
        }));
    };

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append('password', userData.password);
        if (userData.avatar) {
            formData.append('avatar', userData.avatar);
        }

        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/updateUser/${user.cc}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Manejo exitoso, redirige o muestra un mensaje de éxito
            console.log('Usuario actualizado con éxito');
            toast.success('Usuario Actualizado')
        } catch (error) {
            // Manejo de errores, muestra un mensaje de error o realiza alguna acción
            console.error('Error al actualizar usuario', error);
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer/>
            <section className='Layout'>
                <h2 className='text-4xl font-bold mb-4 flex gap-2'>Configuración de Usuario <FaUser /></h2>
                <div className='containerInputs'>
                    <div>
                        <label><b>Nombre de Usuario:</b></label>
                        <input
                            type='text'
                            name='username'
                            disabled
                            value={user.username}
                            placeholder={user.username}
                        />
                    </div>
                    <div>
                        <label><b>Cedula Usuario:</b></label>
                        <input
                            type='text'
                            name='username'
                            disabled
                            value={user.cc}
                            placeholder={user.cc}
                        />
                    </div>
                    <div>
                        <label><b>Correo Electrónico:</b></label>
                        <input
                            type='email'
                            name='email'
                            disabled
                            value={user.email}
                            placeholder={user.email}
                        />
                    </div>
                    <div>
                        <label><b>Contraseña:</b></label>
                        <input
                            type='password'
                            name='password'
                            value={userData.password}
                            placeholder={'Nueva Contraseña'}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label><b>Avatar:</b></label>
                        <input type='file' accept='image/*' onChange={handleFileChange} />
                    </div>
                </div>
                <button className='btnStandard mt-5 text-2xl' onClick={handleUpdate}>Actualizar Usuario</button>
            </section>
        </>
    );
};

export default ConfigPage;

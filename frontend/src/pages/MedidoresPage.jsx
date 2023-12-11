import React, { useState } from 'react';
import Navbar from '../components/navbar/navbar';
import axios from 'axios';

import '../styles/MedidorStyles.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MedidoresPage = () => {
    const [lecturaAnterior, setLecturaAnterior] = useState('');
    const [lecturaActual, setLecturaActual] = useState('');
    const [usuario, setUsuario] = useState({ nombre: '', cedula: '', lecturaAnterior: '', email: '' });
    const [totalPagar, setTotalPagar] = useState(null);
    const [fechaSuspension, setFechaSuspension] = useState('')
    const [fechaToma, setFechaToma] = useState('')

    const opcionesFormato = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
    };

    const handleBuscarUsuario = async () => {
        if (usuario.cedula == '') return toast.error('Cedula Requerida')
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/getUserByCC/${usuario.cedula}`);

            if (response.status === 200) {
                const data = response.data;
                console.log('Datos del usuario:', data);

                setUsuario({
                    nombre: data.username,
                    cedula: data.cc,
                    lecturaAnterior: data.lecturaAnterior,
                    email: data.email, // Agrega el campo email al estado del usuario
                });

                setLecturaAnterior(data.lecturaAnterior);
            } else {
                toast.error("Error Usuario no encontrado", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }   
        } catch (error) {
            toast.error("Usuario no encontrado", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    const handleCalcularFactura = async () => {
        if (usuario.lecturaAnterior > parseInt(lecturaActual)) return toast.error('Lectura Actual Incorrecta')
        if (lecturaActual === '') return toast.error('Lectura Actual Vacia')
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/calcularFactura`, {
                usuario,
                lecturaAnterior: usuario.lecturaAnterior,
                lecturaActual,
                email: usuario.email, // Pasa el campo email en la solicitud
            });

            if (response.status === 200) {
                const data = response.data;
                setTotalPagar(data.totalPagar);
                setFechaSuspension(data.fechaSuspension)
                setFechaToma(data.fechaToma)
            } else {
                return console.error('Error al calcular la factura');
            }
        } catch (error) {
            return toast.error('El usuario ya tiene una factura este Mes')
        }
        toast.success('Factura Generada')
    };

    return (
        <>
            <ToastContainer />
            <Navbar />
            <section className='Layout'>
                <h2 className='text-4xl mb-4 font-bold'>Calcular Medidor</h2>
                <form className='formMedidor'>
                    <div>
                        <label htmlFor='cedula'><b>Cédula:</b></label>
                        <input
                            type='text'
                            id='cedula'
                            value={usuario.cedula}
                            placeholder='C.C.'
                            onChange={(e) => setUsuario({ ...usuario, cedula: e.target.value })}
                        />
                        <button type='button' className='btnStandard' onClick={handleBuscarUsuario}>
                            Buscar Usuario
                        </button>
                    </div>
                    <div>
                        <label htmlFor='nombre'><b>Nombre:</b></label>
                        <input
                            type='text'
                            id='nombre'
                            disabled
                            placeholder='Nombre Usuario'
                            value={usuario.nombre}
                            onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor='email'><b>Email:</b></label>
                        <input
                            type='text'
                            id='email'
                            value={usuario.email}
                            disabled
                            placeholder='Correo de Usuario'
                            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor='lecturaAnterior'><b>Lectura Anterior</b></label>
                        <input
                            type='text'
                            id='lecturaAnterior'
                            value={lecturaAnterior}
                            placeholder='Lectura Anterior'
                            disabled
                            onChange={(e) => setLecturaAnterior(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='lecturaActual'><b>Lectura Actual:</b></label>
                        <input
                            type='number'
                            id='lecturaActual'
                            placeholder='Lectura Actual'
                            value={lecturaActual}
                            onChange={(e) => setLecturaActual(e.target.value)}
                        />
                        <button type='button' className='btnStandard' onClick={handleCalcularFactura}>
                            Calcular Factura
                        </button>
                    </div>
                </form>
                {totalPagar !== null && (
                    <div className='flex flex-col gap-3'>
                        <h1 className='text-3xl mt-5'>Total a Pagar:</h1>
                        <b><p className='text-2xl'>{totalPagar.toLocaleString(
                            'en-CO',
                            {
                                style: 'currency',
                                currency: 'COP',
                            }
                        )}$
                        </p></b>
                        <p className='text-2xl'><b style={{color: 'rgb(70, 70, 248)'}}>Fecha Toma:</b> {new Date(fechaToma).toLocaleDateString('es-CO', opcionesFormato)}</p>
                        <p className='text-2xl'><b style={{color: 'rgb(70, 70, 248)'}}>Fecha Suspension:</b> {new Date(fechaSuspension).toLocaleDateString('es-CO', opcionesFormato)}</p>
                    </div>
                )}
            </section>
        </>
    );
};

export default MedidoresPage;

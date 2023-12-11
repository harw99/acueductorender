import React from 'react';
import Navbar from '../components/navbar/navbar';

import Acueducto from '../assets/acueducto.avif';
import AppWeb from '../assets/AppWeb.jpg';

import Card from '../components/Card';
import '../styles/HomeStyles.css';

const HomePage = () => {

    const harolUser = {
        img: '../src/assets/HarolUser.jpeg',
        name: 'Harold Beltrán',
        rol: 'Desarrollador Full Stack'
    }
    const DavidUser = {
        img: '../src/assets/David.jpeg',
            name: 'David Bermeo',
            rol: 'Desarrollador Frontend'
    }
    const EdierdUser = {
        img: '../src/assets/Edier.jpeg',
            name: 'Edier Chavarro',
            rol: 'Desarrollador Full Stack'
    }
    const JuanUser  = {
        img: '../src/assets/Juanpis.jpeg',
            name: 'Juan Ibarra',
            rol: 'Desarrollador Full Stack'
    }
    const AndreaUser  = {
        img: '../src/assets/Paula.jpeg',
            name: 'Andrea Medina',
            rol: 'Desarrollador Backend'
    }

    return (
        <>
            <Navbar />
            <section className='Layout'>
                <h1 className='text-6xl mb-4 font-bold'>SISGERAM</h1>
                <div className='containerHome'>
                    <div className='sect01'>
                        <p className='paragraph'>¡Bienvenidos a <b>SISGERAM!</b> Somos la plataforma web del acueducto que proporciona una gestión completa para nuestros usuarios. Destacamos por nuestro sistema de facturación eficiente, que garantiza la seguridad y confidencialidad en el manejo de información personal.</p>
                        <img src={Acueducto} width={'500px'} />
                    </div>
                    <div className='sect02'>
                        <img src={AppWeb} width={'500px'} />
                        <p className='paragraph'>Con un diseño <b>intuitivo</b>, facilitamos el acceso a facturas, pagos en línea y notificaciones, asegurando una experiencia óptima y transparente en la interacción con los servicios del acueducto.</p>
                    </div>
                        <h1 className='text-6xl mb-4 font-bold text-center'>Equipo de Trabajo</h1>
                    <div className='sect03'>
                        <Card user={harolUser} />
                        <Card user={DavidUser} />
                        <Card user={EdierdUser} />
                        <Card user={JuanUser} />
                        <Card user={AndreaUser} />
                    </div>
                </div>
            </section>
        </>
    );
}

export default HomePage;

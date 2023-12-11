import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import GotaNav from '../assets/GotaNav.png'
import '../styles/loginStyles.css'

function LoginPage() {

    const { register, handleSubmit, formState: {
        errors
    } } = useForm()
    const { signin, isAuthenticate, errors: signinErrors } = useAuth()

    const onSubmit = handleSubmit(data => {
        signin(data)
    })
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticate) navigate('/home')
    }, [isAuthenticate])


    return (
        <>
            <section className='sectionLogin' style={{ display: 'flex', width: '100vw', height: '100vh', justifyContent: 'space-around', alignItems: 'center' }}>
                <div className='info flex flex-col items-center gap-3'>
                    <h1 style={{ width: '14ch', textAlign: 'center', fontSize: '4em', fontWeight: 'bold' }}>Bienvenidos a SISGERAM</h1>
                    <div>
                        <p style={{ width: '35ch', textAlign: 'center', fontSize: '1.4em' }}>"¡Bienevenido al Acueducto, estamos encantados de tenerte con nosotros. Esperamos que tu vista sea una experiencia maravillosa"</p>
                    </div>
                </div>
                <div className='formLogin z-50'>
                    <form
                        className='formRight'
                        onSubmit={onSubmit}
                    >
                        <img src={GotaNav} width={'120px'} style={{ position: 'relative', left: '-20px' }}  />
                        <h1 className='text-3xl font-bold'>Inicio de Sesion</h1>
                        <h3>Correo Electronico:</h3>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className="inputForm"
                            placeholder="Escribe tu correo"
                        />
                        {errors.email && (<p className="text-red-500">Email es necesario</p>)}
                        <h3>Contraseña:</h3>
                        <input
                            type="password"
                            {...register('password', { required: true })}
                            className="inputForm"
                            placeholder="Escribe tu contraseña"
                        />

                        {
                            signinErrors.map((error, i) => <div key={i} className="bg-red-500 p-2 text-white my-2">{error}</div>)
                        }

                        {errors.password && (<p className="text-red-500">Contraseña de usuario es necesario</p>)}

                        <button type="submit" className="btnLogin">
                            Entrar
                        </button>

                        <p className='flex gap-x-2 justify-between text-black'>
                            No tienes cuenta? <Link to='/register' className='text-red-500'>Sign up</Link>
                        </p>

                    </form>

                </div>

            </section>
        </>

    )

}

export default LoginPage;

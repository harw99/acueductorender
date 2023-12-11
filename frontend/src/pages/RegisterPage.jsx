import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles/loginStyles.css'

function RegisterPage() {
    const { register, handleSubmit, formState: {
        errors
    } } = useForm()
    const { signup, isAuthenticate, errors: registerErros } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticate) navigate('/')
    }, [isAuthenticate])

    const onSubmit = handleSubmit(async (values) => {
        const formData = new FormData();
        formData.append('cc', values.cc);
        formData.append('tipo', values.tipo);
        formData.append('username', values.username);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('rol', values.rol);
    
        // Verificar si hay un archivo seleccionado y agregarlo al objeto FormData
        if (values.avatar && values.avatar.length > 0) {
            formData.append('avatar', values.avatar[0]);
        }
    
        // Llamar a la función de registro con el objeto FormData
        signup(formData);
    });

    return <section className='sectionLogin' style={{ display: 'flex', width: '100vw', height: '100vh', justifyContent: 'space-around', alignItems: 'center' }}>
    <div className='info flex flex-col items-center gap-3'>
        <h1 style={{ width: '14ch', textAlign: 'center', fontSize: '4em', fontWeight: 'bold' }}>Bienvenidos a SISGERAM</h1>
        <div>
            <p style={{ width: '35ch', textAlign: 'center', fontSize: '1.4em' }}>"¡Bienevenido al Acueducto, estamos encantados de tenerte con nosotros. Esperamos que tu vista sea una experiencia maravillosa"</p>
        </div>
    </div>
            {
                registerErros.map((error, i) => <div key={i} className="bg-red-500 p-2 text-white my-2">{error}</div>)
            }

            <form
                onSubmit={onSubmit}
                className="formLogin"
            >
                <h1 className="text-4xl font-bold mt-6 mb-6">Registro de Usuario</h1>
                <input
                    type="text"
                    {...register('cc', { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Documento"
                />

                { errors.cc && (<p className="text-red-500">Documento de usuario es necesario</p>) }

                <select {...register('tipo', { required: true })} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2">
                        <option value="">Seleccione un tipo</option>
                        <option value="CC">CC</option>
                        <option value="TI">TI</option>
                </select>

                { errors.tipo && (<p className="text-red-500">Seleccione Tipo de Documento</p>) }

                <input
                    type="text"
                    {...register('username', { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Nombre"
                />

                { errors.username && (<p className="text-red-500">Nombre de usuario es necesario</p>) }


                <input
                    type="email"
                    {...register('email', { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Email"
                />

                { errors.email && (<p className="text-red-500">Email es necesario</p>) }

                <input
                    type="password"
                    {...register('password', { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Contraseña"
                />

                { errors.password && (<p className="text-red-500">Contraseña de usuario es necesario</p>) }


                <label htmlFor="role" className="text-white">
                    Role:
                </label>
                <select
                    {...register('rol', { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Image User"
                >
                    <option value="invitado">Invitado</option>
                </select>

                <input type="file" {...register('avatar')} accept="image/*" className="my-2" />

                <button type="submit" className="btnLogin">
                    Register
                </button>

                <p className='flex gap-x-2 justify-between text-white'>
                    Ya tienes cuenta?, Haz login! <Link to='/' className='text-red-500'>Login</Link>
                </p>

            </form>
        
    </section>
}

export default RegisterPage;

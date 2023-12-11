import React from 'react';
import Navbar from '../components/navbar/navbar';

const PagosPage = () => {

    // const handleCheckout = async () => {
    //     try {
    //         const response = await fetch(`${import.meta.env.VITE_API_URL}/create-order`, {
    //             method: 'POST',
    //         });

    //         const data = await response.json();
    //         console.log(data);

    //         // Redirigir a la URL obtenida desde el servidor
    //         window.location.href = data.init_point;
    //     } catch (error) {
    //         console.error('Error during checkout:', error);
    //         // Tratar errores si es necesario
    //     }
    // };

    return (
        <>
            <Navbar />
            <section className='Layout'>
                PagosPage
                <div className="container mt-5">
                    <button
                        id="checkout"
                        className="btn btn-outline-info mx-auto"
                        // onClick={handleCheckout}
                    >
                        Pagar Factura
                    </button>
                </div>
            </section>
        </>
    );
}

export default PagosPage;

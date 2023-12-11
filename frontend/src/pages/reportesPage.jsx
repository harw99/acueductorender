import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar/navbar';
import { Chart } from 'primereact/chart';
import axios from 'axios';
import { format, startOfMonth, addMonths } from 'date-fns';

const ReportesPage = () => {
    const [facturas, setFacturas] = useState([]);
    const [chartData, setChartData] = useState({});
    const [chartOptions] = useState({
        scales: {
            y: {
                beginAtZero: true
            }
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/getFacturas`);
                setFacturas(response.data.response.reverse());
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []); // Solo ejecutamos la carga de datos una vez al montar el componente

    useEffect(() => {
        const calculateChartData = () => {
            console.log('Calculando datos del gráfico...');
    
            const newChartData = {
                labels: [],
                datasets: [
                    {
                        label: 'Cantidad de Facturas',
                        data: [],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgb(75, 192, 192)',
                        borderWidth: 1,
                    },
                ],
            };
    
            // Agregamos un mapa para contar las facturas por mes
            const monthMap = new Map();
    
            facturas.forEach((factura) => {
                const fechaToma = new Date(factura.fechaToma);
                const mes = fechaToma.getMonth() + 1;
    
                // Actualizamos el mapa
                monthMap.set(mes, (monthMap.get(mes) || 0) + 1);
            });
    
            // Ordenamos los meses
            const orderedMonths = Array.from(monthMap.keys()).sort((a, b) => a - b);
    
            // Iteramos sobre los meses ordenados y actualizamos los datos del gráfico
            for (const mes of orderedMonths) {
                newChartData.labels.push(`Mes ${mes}`);
                newChartData.datasets[0].data.push(monthMap.get(mes));
            }
    
            console.log('Datos del gráfico calculados:', newChartData);
            setChartData(newChartData);
        };
    
        if (facturas.length > 0) {
            calculateChartData();
        }
    }, [facturas]); // Solo ejecutamos el cálculo cuando las facturas cambian

    return (
        <>
            <Navbar />
            <section className='Layout'>
                <h2 className='text-4xl font-bold'>Reportes</h2>
                <div className="card">
                    <Chart type="bar" data={chartData} options={chartOptions} />
                </div>
            </section>
        </>
    );
}

export default ReportesPage;

import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/navbar';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Paginator } from 'primereact/paginator';
import { BiSearchAlt } from 'react-icons/bi';
import { format } from 'date-fns-tz';

import '../styles/facturasStyles.css'

const FacturasPage = () => {
    const [facturas, setFacturas] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [cedulaFilterValue, setCedulaFilterValue] = useState('');
    const [nombreFilterValue, setNombreFilterValue] = useState('');
    const [correoFilterValue, setCorreoFilterValue] = useState('');
    const [fechaSuspensionFilterValue, setFechaSuspensionFilterValue] = useState('');
    const [fechaTomaFilterValue, setFechaTomaFilterValue] = useState('');
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

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
    }, []);

    const onGlobalFilterChange = (e) => {
        setGlobalFilterValue(e.target.value);
        setFirst(0);
    };

    const onCedulaFilterChange = (e) => {
        setCedulaFilterValue(e.target.value);
        setFirst(0);
    };

    const onNombreFilterChange = (e) => {
        setNombreFilterValue(e.target.value);
        setFirst(0);
    };

    const onCorreoFilterChange = (e) => {
        setCorreoFilterValue(e.target.value);
        setFirst(0);
    };

    const onFechaSuspensionFilterChange = (e) => {
        setFechaSuspensionFilterValue(e.target.value);
        setFirst(0);
    };

    const onFechaTomaFilterChange = (e) => {
        setFechaTomaFilterValue(e.target.value);
        setFirst(0);
    };

    const filterGlobal = (array, text) => {
        const searchText = text.toLowerCase();
        return array.filter((item) =>
            Object.values(item.usuario).some((value) => {
                if (value && typeof value === 'string') {
                    const itemText = value.toLowerCase();
                    return itemText.includes(searchText);
                }
                return false;
            })
        );
    };

    const filterLocal = (array, field, text) => {
        const searchText = text.toLowerCase();
        return array.filter((item) => {
            const itemValue = item[field] ? item[field].toString().toLowerCase() : '';
            return itemValue.includes(searchText);
        });
    };

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const filteredGlobal = filterGlobal(facturas, globalFilterValue);
    const filteredArray = filterLocal(
        filterLocal(
            filterLocal(
                filterLocal(
                    filterLocal(
                        filterLocal(filteredGlobal, 'usuario.cedula', cedulaFilterValue),
                        'usuario.nombre',
                        nombreFilterValue
                    ),
                    'usuario.email',
                    correoFilterValue
                ),
                'fechaSuspension',
                fechaSuspensionFilterValue
            ),
            'fechaToma',
            fechaTomaFilterValue
        ),
        'fechaSuspension',
        cedulaFilterValue
    );
    const totalRecords = filteredArray.length;
    const visibleData = filteredArray.slice(first, first + rows);

    return (
        <>
            <Navbar />
            <section className='Layout layoutFacturas'>
                <h1 className='text-6xl font-bold'>Facturas</h1>
                <div className='table-container mt-9'>
                    <div className='flex justify-content-end search mt-9'>
                        <BiSearchAlt style={{ color: 'black', fontSize: '1.6em' }} />
                        <span className='p-input-icon-left'>
                            <InputText
                                style={{ outline: 'none', borderBottom: '2px solid black' }}
                                value={globalFilterValue}
                                onChange={onGlobalFilterChange}
                                placeholder='C.C, Usuario Email '
                            />
                            <span className='ml-5'>Facturas Totales: {facturas.length}</span>
                        </span>
                    </div>

                    <DataTable value={visibleData}
                        className='p-datatable-custom'
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10]}
                        emptyMessage='No hay facturas'
                        currentPageReportTemplate='{first} - {last} de {totalRecords} facturas'
                        paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                        rowsPerPageTemplate='5,10,20'>
                        <Column
                            field='fechaToma'
                            header='Fecha Toma'
                            body={(rowData) => format(new Date(rowData.fechaToma), 'dd/MM/yyyy HH:mm:ssXXX', { timeZone: 'America/Bogota' })}
                        ></Column>
                        <Column
                            field='fechaSuspension'
                            header='Fecha Suspensión'
                            body={(rowData) => format(new Date(rowData.fechaSuspension), 'dd/MM/yyyy HH:mm:ssXXX', { timeZone: 'America/Bogota' })}
                        ></Column>
                        <Column field='lecturaAnterior' header='Lectura Anterior'></Column>
                        <Column field='lecturaActual' header='Lectura Actual'></Column>
                        <Column field='totalPagar' header='Total Pagar'></Column>
                        <Column field='usuario.cedula' header='Cedula Usuario'>
                            <InputText
                                value={cedulaFilterValue}
                                onChange={onCedulaFilterChange}
                                placeholder='Buscar'
                                className='p-ml-2'
                                style={{ outline: 'none', borderBottom: '2px solid #4CAF50' }}
                            />
                        </Column>
                        <Column field='usuario.email' header='Email Usuario'>
                            <InputText
                                value={correoFilterValue}
                                onChange={onCorreoFilterChange}
                                placeholder='Buscar'
                                className='p-ml-2'
                                style={{ outline: 'none', borderBottom: '2px solid #4CAF50' }}
                            />
                        </Column>
                        <Column field='usuario.nombre' header='Nombre Usuario'>
                            <InputText
                                value={nombreFilterValue}
                                onChange={onNombreFilterChange}
                                placeholder='Buscar'
                                className='p-ml-2'
                                style={{ outline: 'none', borderBottom: '2px solid #4CAF50' }}
                            />
                        </Column>
                    </DataTable>

                    <Paginator first={first}
                        rows={rows}
                        totalRecords={totalRecords}
                        onPageChange={onPageChange}
                        className='p-paginator-custom' />
                </div>
            </section>
        </>
    );
};

export default FacturasPage;

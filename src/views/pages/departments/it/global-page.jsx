import React, { useState } from 'react'
import TableItog from './components/tableItog'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchItogs } from 'src/app/slices/itogs';
import { CCard, CCardHeader } from '@coreui/react';
import LoadAnimate from '../components/pages/loading_animate';
import PieChart from './components/PieChart';

export default function ItogResult() {

    const { itogs, status } = useSelector((state) => state.itogs)
    const totalAllItog = itogs.totalAllItog
    const otdel = itogs.otdel
    const dispatch = useDispatch();
    const labels = ['Монако', 'Ильяс', 'Туран']
    const data = []
    if (status === 'succeeded') {
        data.push(totalAllItog.lider.itog)
        data.push(totalAllItog.fenix.itog)
        data.push(totalAllItog.turan.itog)
    }
    const [selectedOtdel, setSelectedOtdel] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalRaznica, setTotalRaznica] = useState(0);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchItogs());
        }
    }, [dispatch]);

    useEffect(() => {
        if (selectedOtdel) {
            let filteredData = otdel[selectedOtdel];

            const parseDate = (dateString) => {
                const [day, month, year] = dateString.split('.');
                return new Date(`${year}-${month}-${day}`);
            };
            if (startDate) {
                filteredData = filteredData.filter(item => parseDate(item.date) >= parseDate(startDate));
            }
            if (endDate) {
                const endDatePlusOne = new Date(parseDate(endDate));
                endDatePlusOne.setDate(endDatePlusOne.getDate() + 1);

                filteredData = filteredData.filter(item => parseDate(item.date) < endDatePlusOne);
            }

            const totalRaznica = filteredData.reduce((acc, item) => acc + item.itog[0].raznica, 0);
            setTotalRaznica(totalRaznica);
        } else {
            setTotalRaznica(0);
        }
    }, [selectedOtdel, startDate, endDate, otdel]);
    const handleOtdelChange = (event) => {
        setSelectedOtdel(event.target.value);
        setTotalRaznica(0);
    };

    return (
        status === 'succeeded' ?
            (
                <div>
                    <div className='grid lg:grid-cols-2 mb-2'>
                        <NavLink to='/search-itogs' style={{ textDecoration: 'none' }} className="cursor-pointer mb-2 mr-2">
                            <CCard className="p-3">
                                <div className='flex gap-3'>
                                    <div className="">Поиск отчетов</div>
                                    <div className=""><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                    </svg>
                                    </div>
                                </div>
                            </CCard>
                        </NavLink>
                        <NavLink to='/search-client-otchet' style={{ textDecoration: 'none' }} className=" rounded-xl cursor-pointer mb-2 mr-2">
                            <CCard className="p-3">
                                <div className='flex gap-3'>
                                    <div className="">Поиск клиента</div>
                                    <div className=""><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                    </svg>
                                    </div>
                                </div>
                            </CCard>
                        </NavLink>
                        {/* <NavLink to='/clients-all' className="bg-white dark:bg-slate-700 rounded-xl shadow cursor-pointer mb-2 mr-2">
                            <div className="stat">
                                <div className="stat-title dark:text-slate-300 lg:text-sm text-[10px]">Привлеченные клиенты</div>
                                <div className={`stat-figure dark:text-slate-300}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                                </svg>
                                </div>
                            </div>
                        </NavLink> */}
                        {/* <NavLink to='/it-manager-all' className="bg-white dark:bg-slate-700 rounded-xl shadow cursor-pointer mb-2 mr-2">
                            <div className="stat">
                                <div className="stat-title dark:text-slate-300 lg:text-sm text-[10px]">Ведущие менеджеры</div>
                                <div className={`stat-figure dark:text-slate-300}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                                </svg>
                                </div>
                            </div>
                        </NavLink> */}
                        <NavLink to='/it-buyers' style={{ textDecoration: 'none' }} className=" cursor-pointer mb-2 mr-2">
                            <CCard className="p-3">
                                <div className='flex gap-3'>
                                    <div className="">Байеры</div>
                                    <div className=""><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                                    </svg>
                                    </div>
                                </div>
                            </CCard>
                        </NavLink>
                        <NavLink to='/it-smanager' style={{ textDecoration: 'none' }} className=" cursor-pointer mb-2 mr-2">
                            <CCard className="p-3">
                                <div className='flex gap-3'>
                                    <div className="">Менеджеры</div>
                                    <div className=""><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                                    </svg>
                                    </div>
                                </div>
                            </CCard>
                        </NavLink>
                        {/* <NavLink to='/incoming-and-outgoing' className="bg-white rounded-xl dark:bg-slate-700 shadow cursor-pointer mb-2 mr-2">
                            <div className="stat">
                                <div className="stat-title dark:text-slate-300">Приходы и расходы</div>
                                <div className={`stat-figure dark:text-slate-300}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                </svg>
                                </div>
                            </div>
                        </NavLink> */}
                    </div>
                    <div className='flex lg:flex-row flex-col gap-3 mb-3'>
                        <CCard className='lg:w-[50%]'>
                            <CCardHeader>за текущий месяц</CCardHeader>
                            <table className='table w-full'>
                                <thead>
                                    <tr>
                                        <th>общий итог комиссии:<span className='ml-5 text-blue-600'>{totalAllItog.allItogs.itog}</span> </th>
                                    </tr>
                                    <tr>
                                        <th>общий итог индекс:<span className='ml-5 text-blue-600'>{totalAllItog.allItogs.index}</span> </th>
                                    </tr>
                                    <tr>
                                        <th>касса:<span className='ml-5 text-blue-600'>{totalAllItog.allItogs.allItog}</span></th>
                                    </tr>
                                </thead>
                            </table>
                            <table className='w-full table mt-1 text-center'>
                                <thead>
                                    <tr>
                                        <th colSpan='2'>Монако</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th className='border'>комиссия: <span className='text-blue-600 ml-2 text-[12px]'>{totalAllItog.lider.itog}</span></th>
                                        <th className='border'>индекс: <span className='text-blue-600 ml-2 text-[12px]'>{totalAllItog.lider.index}</span></th>
                                    </tr>
                                </tbody>
                            </table>

                            <table className='w-full table mt-1 text-center'>
                                <thead>
                                    <tr>
                                        <th colSpan='2'>Ильяс</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th className='border'>комиссия: <span className='text-blue-600 ml-2 text-[12px]'>{totalAllItog.fenix.itog}</span></th>
                                        <th className='border'>индекс: <span className='text-blue-600 ml-2 text-[12px]'>{totalAllItog.fenix.index}</span></th>
                                    </tr>
                                </tbody>
                            </table>
                            <table className='w-full table mt-1 text-center'>
                                <thead>
                                    <tr>
                                        <th colSpan='2'>Туран</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th className='border'>комиссия: <span className='text-blue-600 ml-2 text-[12px]'>{totalAllItog.turan.itog}</span></th>
                                        <th className='border'>индекс: <span className='text-blue-600 ml-2 text-[12px]'>{totalAllItog.turan.index}</span></th>
                                    </tr>
                                </tbody>
                            </table>

                        </CCard>
                        <PieChart
                            labels={labels}
                            title={'Комиссия'}
                            subLabel={'комиссия за текущий месяц'}
                            datas={data}
                        />
                    </div>
                    <CCard>
                        <CCardHeader>Руководительские % за текущий месяц</CCardHeader>
                        <div className="p-4">
                            <p className="text-lg font-semibold mb-2">Выбрать отдел</p>
                            <select
                                className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={selectedOtdel}
                                onChange={handleOtdelChange}
                            >
                                <option value=''>Не выбрано</option>
                                <option value='lider'>Монако</option>
                                <option value='fenix'>Ильяс</option>
                                <option value='turan'>Туран</option>
                            </select>
                            <div className="mt-3">
                                <p className="text-lg font-semibold mb-2">Выбрать период</p>
                                <div className="mb-4">
                                    <p className="text-sm font-medium mb-1">От</p>
                                    <input
                                        type="date"
                                        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <p className="text-sm font-medium mb-1">До</p>
                                    <input
                                        type="date"
                                        className="w-full p-2 rounded-md border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            {selectedOtdel && (
                                <div className="mt-3 p-4 bg-gray-100 dark:bg-slate-700 rounded-md">
                                    <p className="text-lg font-semibold">
                                        Результат за {startDate && endDate ? 'выбранный период' : 'текущий месяц'}: {totalRaznica}
                                    </p>
                                </div>
                            )}
                        </div>
                    </CCard>
                    <div className='lg:grid lg:grid-cols-2 mt-3 mb-3 gap-3'>
                        <CCard>
                            <CCardHeader>Монако</CCardHeader>
                            <TableItog datas={otdel.lider} total={totalAllItog.lider} />
                        </CCard>

                        <CCard>
                            <CCardHeader>Ильяс</CCardHeader>
                            <TableItog datas={otdel.fenix} total={totalAllItog.fenix} />
                        </CCard>
                        <CCard>
                            <CCardHeader>Туран</CCardHeader>
                            <TableItog datas={otdel.turan} total={totalAllItog.turan} />
                        </CCard>

                    </div>
                </div>
            ) : (
                <div className='w-full gap-2 flex-col flex justify-center items-center'><LoadAnimate />загружаем данных, просим подождать</div>
            )
    )
}
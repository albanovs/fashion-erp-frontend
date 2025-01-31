import { NavLink } from "react-router-dom";
import React, { useState } from 'react'
import { CCard } from "@coreui/react";


export default function OtchetList({ datas, api }) {

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const currentMonthValue = currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;

    const [selectedMonth, setSelectedMonth] = useState(currentMonthValue);
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const sortedData = typeof datas === 'object' ? datas
        .map((elem) => {
            return {
                ...elem,
                dateObject: new Date(elem.date.split('.').reverse().join('-')),
            };
        })
        .sort((a, b) => a.dateObject - b.dateObject) : null

    const groupedData = sortedData !== null && sortedData.reduce((acc, elem) => {
        const [day, month, year] = elem.date.split('.');
        const key = `${year}-${month}`;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(elem);
        return acc;
    }, {})

    const uniqueYears = Array.from(new Set(datas.map(elem => elem.date.split('.')[2])));

    return (
        groupedData ?
            <CCard className="lg:p-5 p-4 mb-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="rounded-md bg-inherit"
                        >
                            <option value='01'>январь</option>
                            <option value='02'>февраль</option>
                            <option value='03'>март</option>
                            <option value='04'>апрель</option>
                            <option value='05'>май</option>
                            <option value='06'>июнь</option>
                            <option value='07'>июль</option>
                            <option value='08'>авгуcт</option>
                            <option value='09'>сентябрь</option>
                            <option value='10'>октябрь</option>
                            <option value='11'>ноябрь</option>
                            <option value='12'>декабрь</option>
                        </select>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="rounded-md bg-inherit"
                        >
                            {uniqueYears.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    <NavLink to={`/${api}-list-search`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer hover:scale-110">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                    </NavLink>
                </div>

                {Object.entries(groupedData).map(([key, data]) => {
                    const [year, month] = key.split('-');
                    if (selectedMonth === month && selectedYear.toString() === year) {
                        return (
                            <div key={key}>
                                <h2 className="text-xl text-center font-bold mt-4 mb-4">
                                    {month === '01' ? `Отчет за январь ${year}`
                                        : month === '02' ? `Отчет за февраль ${year}`
                                            : month === '03' ? `Отчет за март ${year}`
                                                : month === '04' ? `Отчет за апрель ${year}`
                                                    : month === '05' ? `Отчет за май ${year}`
                                                        : month === '06' ? `Отчет за июнь ${year}`
                                                            : month === '07' ? `Отчет за июль ${year}`
                                                                : month === '08' ? `Отчет за август ${year}`
                                                                    : month === '09' ? `Отчет за сентябрь ${year}`
                                                                        : month === '10' ? `Отчет за октябрь ${year}`
                                                                            : month === '11' ? `Отчет за ноябрь ${year}`
                                                                                : month === '12' ? `Отчет за декабрь ${year}`
                                                                                    : ''
                                    }
                                </h2>
                                <table className="lg:table w-full lg:text-sm text-[8px] text-center">
                                    <thead>
                                        <tr>
                                            <th>дата</th>
                                            <th>Комиссия</th>
                                            <th>индекс</th>
                                            <th>детали</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {data.map((elem) => {
                                            return (
                                                <tr className="border lg:border-none cursor-pointer">
                                                    <td className="p-1">{elem.date}</td>
                                                    <td className="p-1">{elem.itog.map(item => item.allItog)}</td>
                                                    <td className="p-1">{elem.itog.map(item => item.allItogIndex)}</td>
                                                    <td className="p-1">
                                                        <NavLink
                                                            to={`/reports/${api}/${elem._id}`}
                                                            className='underline text-blue-800'
                                                        >Узнать больше</NavLink>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        );
                    }
                })}
            </CCard>
            : 'загрузка...'
    )
}
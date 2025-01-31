import { NavLink } from "react-router-dom";
import React, { useState } from 'react'
import { CCard } from "@coreui/react";
import LoadAnimate from "../../pages/loading_animate";


export default function ListManager({ datas, api }) {

    const currentMonth = new Date().getMonth() + 1;
    const currentMonthValue = currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;
    const currentYear = new Date().getFullYear();
    const filteredDatas = datas?.filter(item => {
        const [day, month, year] = item.date.split('.');
        return parseInt(year) === currentYear;
    });

    const [selectedMonth, setSelectedMonth] = useState(currentMonthValue);

    const sortedData = typeof filteredDatas === 'object' ? filteredDatas
        .map((elem) => {
            return {
                ...elem,
                dateObject: new Date(elem.date.split('.').reverse().join('-')),
            };
        })
        .sort((a, b) => a.dateObject - b.dateObject) : null

    const groupedData = sortedData !== null && sortedData.reduce((acc, elem) => {
        const month = elem.date.split('.')[1];
        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push(elem);
        return acc;
    }, {})

    return (
        sortedData ? (<CCard className="mb-4 p-4">
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
                </div>
            </div>

            {Object.entries(groupedData).map(([month, data]) => {
                if (selectedMonth == month) {
                    return (
                        <div key={month}>
                            <h2 className="text-xl text-center font-bold mt-4 mb-4">
                                {month === '01' ? 'Отчет за январь'
                                    : month === '02' ? 'Отчет за февраль'
                                        : month === '03' ? 'Отчет за март'
                                            : month === '04' ? 'Отчет за апрель'
                                                : month === '05' ? 'Отчет за май'
                                                    : month === '06' ? 'Отчет за июнь'
                                                        : month === '07' ? 'Отчет за июль'
                                                            : month === '08' ? 'Отчет за август'
                                                                : month === '09' ? 'Отчет за сентябрь'
                                                                    : month === '10' ? 'Отчет за октябрь'
                                                                        : month === '11' ? 'Отчет за ноябрь'
                                                                            : month === '12' ? 'Отчет за декабрь'
                                                                                : ''
                                }
                            </h2>
                            <table className="table w-full lg:text-sm text-[8px] text-center">
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
                                            <tr className="cursor-pointer">
                                                <td>{elem.date}</td>
                                                <td>{elem.itog.map(item => item.allItog)}</td>
                                                <td>{elem.itog.map(item => item.allItogIndex)}</td>
                                                <td>
                                                    <NavLink
                                                        to={`/reports/${api}-manager/${elem._id}`}
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
        </CCard>) : (
            <div className='w-full gap-2 flex-col flex justify-center items-center'><LoadAnimate />загружаем данных, просим подождать</div>
        )
    )
}
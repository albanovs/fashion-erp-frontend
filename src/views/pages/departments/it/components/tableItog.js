import React from 'react';
import { NavLink } from 'react-router-dom';

export default function TableItog({ datas, total }) {
    const sortedDatas = [...datas].sort((a, b) => {
        const dateA = Number(a.date.slice(0, 2));
        const dateB = Number(b.date.slice(0, 2));
        return dateA - dateB;
    });

    return (
        <div className='p-3'>
            <table className='w-full table text-sm'>
                <thead className='font-bold'>
                    <tr>
                        <th className=''>дата</th>
                        <th className=''>комиссия</th>
                        <th className=''>индекс</th>
                        <th className=''>детали</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sortedDatas.map(elem => {
                            return (
                                elem.itog.map(item => {
                                    return (
                                        <tr key={item.date}>
                                            <td className=''>{elem.date}</td>
                                            <td className=''>{item.allItog}</td>
                                            <td className=''>{item.allItogIndex}</td>
                                            <td>
                                                <NavLink to={`/detail-allitog/${elem._id}`} className='underline text-blue-600'>детали</NavLink>
                                            </td>
                                        </tr>
                                    )
                                })
                            )
                        })
                    }
                </tbody>
            </table>
            <table className='w-full text-left'>
                <tr className='border'>
                    <th>Общая комиссия:</th>
                    <td>{total.itog}</td>
                </tr>
                <tr>
                    <th>Общая комиссия в %:</th>
                    <td>{total.percentItog}</td>
                </tr>
                <tr className='border'>
                    <th>общий индекс:</th>
                    <td>{total.index}</td>
                </tr>
                <tr>
                    <th>общий индекс в %:</th>
                    <td>{total.percentIndex}</td>
                </tr>
            </table>
        </div>
    )
}
